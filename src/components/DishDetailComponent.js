import React from 'react';
import {Card,CardImg,CardTitle,CardBody,CardText,Breadcrumb,Row,BreadcrumbItem,Modal,ModalBody,ModalHeader,Label,Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control,LocalForm,Errors} from 'react-redux-form';

const required=(val)=> val ;
const minlength=(len)=>(val)=> val && val.length>=2;
const maxlength=(len)=>(val)=> !val || val.length<=20;

class CommentForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
        }
        this.toggleModal=this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render(){
        return(
            <React.Fragment>
                <Button color="primary" onClick={this.toggleModal}><span className="fa fa-pencil">&nbsp;Submit Comment</span></Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values)=>{
                            this.toggleModal();
                            this.props.addComment(this.props.dishId, values.cname, values.rating, values.comm);

                            }
                        }>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select name="rating" id="rating" model=".rating" className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="cname">Your Name</Label>
                                <Control.text name="cname" id="cname" model=".cname" className="form-control"
                                    validators={{
                                        required, minlength:minlength(2), maxlength:maxlength(20)
                                    }} />
                                <Errors
                                    className="text-danger"
                                    model=".cname"
                                    show="touched"
                                    messages={{
                                        required: "Required ",
                                        minlength: "Minimum 2 characters required ",
                                        maxlength: "Maximum 20 characters allowed"
                                    }}/>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comm">Comment</Label>
                                <Control.textarea name="comm" id="comm" model=".comm" rows="6" className="form-control"
                                    validators={{
                                        required
                                    }} />
                                    <Errors
                                    className="text-danger"
                                    model=".comm"
                                    show="touched"
                                    messages={{
                                        required: "Required "
                                        
                                    }}/>
                            </Row>
                            <Row className="form-group">
                                <Button type="submit" color="primary" onClick={this.toggleModal}>Submit</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }

}

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

    renderComments({comments, dishId, addComment}){
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
                <React.Fragment>
                    <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                        <ul className='list-unstyled'>
                            {com}
                        </ul>
                        <CommentForm dishId={dishId} addComment={addComment}/>
                    </div>
                    
                </React.Fragment>
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
        //const commentItem = this.renderComments(comments, this.props.dishId, this.props.addComment)
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
                <this.renderComments comments={this.props.comment} dishId={this.props.dish.id} addComment={this.props.addComment} />                 
            </div>
            </div>
        )
    }
}

export default DishDetail;