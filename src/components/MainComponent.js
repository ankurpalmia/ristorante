import React from 'react';
import '../App.css';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import DishDetail from './DishDetailComponent';
import Footer from './FooterComponent';
import {DISHES} from '../shared/dishes';
import {PROMOTIONS} from '../shared/promotions';
import {LEADERS} from '../shared/leaders';
import {COMMENTS} from '../shared/comments';
import {Switch,Route,Redirect} from 'react-router-dom';

class Main extends React.Component{

  constructor(props){
    super(props);

    this.state={
      dishes:DISHES,
      promotions: PROMOTIONS,
      comments: COMMENTS,
      leaders: LEADERS,
      selectedDish:null
    };
  }

  onDishSelect(dishId){
    this.setState({selectedDish:dishId});
  }

 
  render(){
    const HomePage=()=>{
        return (<Home 
            dish={this.state.dishes.filter((dish)=>dish.featured)[0]}
            promotion={this.state.promotions.filter((promotion)=>promotion.featured)[0]}
            leader={this.state.leaders.filter((leader)=>leader.featured)[0]}
        />);
      }

    const DishComponnent=({match})=>{
        return(
            <DishDetail dish={this.state.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]} 
                comment={this.state.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId,10))}
            />

        );
    }
      
  return (
      
    <div>
        <Header/>
        <Switch>
            <Route path="/home" component={HomePage}/>
            <Route exact path="/menu" component={()=> <Menu dishes={this.state.dishes}/>}/>
            <Route path="/menu/:dishId" component={DishComponnent} />
            <Route path="/aboutus" component={()=> <About leaders={this.state.leaders}/>} />
            <Route exact path="/contactus" component={Contact}/>
            <Redirect to="/home"/>
        </Switch>
        <Footer />
      </div>
  );
  }
}

export default Main;
