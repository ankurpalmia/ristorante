import React from 'react';
import '../App.css';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import DishDetail from './DishDetailComponent';
import Footer from './FooterComponent';
import {Switch,Route,Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addComment} from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => ({
  addComment : (dishId, author, rating, comment) => dispatch(addComment(dishId, author, rating, comment))
});

const mapStateToProps = state => {
  return{
  dishes: state.dishes,
  promotions: state.promotions,
  comments: state.comments,
  leaders: state.leaders
  };
}

class Main extends React.Component{

  render(){
    const HomePage=()=>{
        return (<Home 
            dish={this.props.dishes.filter((dish)=>dish.featured)[0]}
            promotion={this.props.promotions.filter((promotion)=>promotion.featured)[0]}
            leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
        />);
      }

    const DishComponnent=({match})=>{
        return(
            <DishDetail dish={this.props.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]} 
                comment={this.props.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId,10))}
              addComment={this.props.addComment}
            />

        );
    }
      
  return (
      
    <div>
        <Header/>
        <Switch>
            <Route path="/home" component={HomePage}/>
            <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes}/>}/>
            <Route path="/menu/:dishId" component={DishComponnent} />
            <Route path="/aboutus" component={()=> <About leaders={this.props.leaders}/>} />
            <Route exact path="/contactus" component={Contact}/>
            <Redirect to="/home"/>
        </Switch>
        <Footer />
      </div>
  );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
