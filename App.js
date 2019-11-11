import React, {Component} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import FeedItem from './component/FeedItem';

// const API_URL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=3a37ee30da324b278181bcb4c308ac95"
export default class App extends Component  {
  state = {
    isLoading : true,
    listArticles:[],
    totalResults:0,
    page: 1,
  }

  componentDidMount = async() =>{
    const {page } = this.state;
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=3a37ee30da324b278181bcb4c308ac95&page=${page}`);
    const jsonReponse = await response.json();
    this.setState({
      isLoading: false,
      listArticles: jsonReponse.articles,
      totalResults: response.totalResults
      
    });
  }
  onEndReached = async() =>{
    const {page, listArticles} = this.state;
    const newpage = page +1;
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=3a37ee30da324b278181bcb4c308ac95&page=${newpage}`);
    const jsonReponse = await response.json();
    this.setState({
      page: newpage,
      listArticles:listArticles.concat(jsonReponse.articles),
      totalResults: response.totalResults
      
    });
    

  }
  renderItem = ({item}) =>{
    return <FeedItem item={item}/>
  }

  render(){
    const {isLoading, listArticles} = this.state
    if(isLoading){
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' animating={isLoading}/>
        </View>
      );
    }else {
      return (
          <FlatList style={styles.flaylist} data={listArticles}
          renderItem={this.renderItem}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={1}
          />
      );
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flaylist:{
    margin:15
  }
});
