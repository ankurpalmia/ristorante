import React from 'react';
import {Card,CardImg,CardTitle,CardBody,CardText,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';

class DishDetail extends React.Component{

    constructor(props){
        super(props);
        this.state={

        }
        
    }

    renderDish(dish){
        if(dish){
            return(
                <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg src={dish.image} width="100%" />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
            );
        }
    }

    

    renderComments(comments){
        if(comments){
            const com=comments.map((comment)=>{
                return(
                    <li key={comment.id}>
                       <p> {comment.comment}</p>
                        <p>--{comment.author} ,
                        {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(comment.date))}</p>
                    </li>
                );
            });
            return(
                <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className='list-unstyled'>
                    {com}
                </ul>
                </div>
            );
        }
        else{
            return(<div></div>);
        }
    }

    render() {
        const dish = this.props.dish;
        const comments=this.props.comment;
        if (dish == null) {
            return (<div></div>)
        }
        const dishItem = this.renderDish(dish)
        const commentItem = this.renderComments(comments)
        return (
            <div className="container">
                <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="row">
                <h3>{dish.name}</h3><hr/>
            </div>
            <div className='row'>
                
                {dishItem}
                
                {commentItem}
            </div>
            </div>
        )
    }
}

export default DishDetail;