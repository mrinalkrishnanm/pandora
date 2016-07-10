import React from 'react';
import Router from 'react-router';
import Request from 'superagent';
import UserNavbar from './UserNavbar.jsx';
import Select from 'react-select';
import _ from 'lodash';
import CodeResultList from './CodeResultList.jsx';
import API from './API.js';
//import $ from 'jquery';
import Filterbar from './Filterbar.jsx';
import WebSidebar from './WebSidebar.jsx';
import MobileSidebar from './MobileSidebar.jsx';
import SnippetSidebar from './SnippetSidebar.jsx';

class SearchCode extends React.Component{
  constructor(){
    super()
    this.state = {
      isSearching: false,
      newResult: [],
      searchable: false,
      noMatchFlag: false,
      keyword: "",
      category: "",
      difficulty: "",
      language: ""
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    var keyword = this.refs.keyword.value.trim()
    var category = this.state.category
    this.setState({isSearching:true, keyword: keyword})

    var _data  = {

      keyword: keyword,
      category: category

    }

    var _this = this
    var url = API.url('codes/search')
    var success = function(res) {
      console.log(res)
      _this.setState({result : res, keyword: keyword})
    }
    var failure = function(res) {
      console.log(res)
      _this.setState({isError: true})
      
    }
    API.post(url,_data,success,failure);

  }

  handleCategoryFilter(e,category) {
    console.log(category)
    var url = API.url('codes/search')
    var data = {
      category: category
    }
    var _this = this
    var success = function(res) {
      console.log(res)
      _this.setState({result: res, category: category,
      searchable: true})
    }
    var failure = function(res) {
      console.log(res)
      _this.setState({category: category,
                      isError: true})
    }

    API.post(url,data,success,failure);
  }
  render(){

    var options = [
      { value: 'ruby', label: 'Ruby' },
      { value: 'python', label: 'Python' },
      { value: 'javascript', label: 'Javascript' },
      { value: 'java', label: 'Java' }
    ];

    var display_none = <h2 className="no-result"> No Results </h2>
    var language = this.state.language

    var flag = this.state.noMatchFlag
    var searchable = this.state.searchable

    if(flag)
      var display = display_none
    else if(true)
      var display = <CodeResultList codes={this.state.newResult} />
    else if(!_.isEmpty(this.state.result))
      var display = <CodeResultList codes={this.state.result} />
    else
      var display = ""

    if(searchable)
      var displaySearchBar = (            <div className="search-options">
              <input ref="keyword" type="text" placeholder="Enter keyword" />
              <button onClick={this.handleSubmit.bind(this)} 
                className="search-button"> Search </button>
            </div>
)
    return(
      <div className="search-code-container">
        <div className="header-wrapper">
          <div className="header">
            <div className="logo">
              <img src="img/logo4.png" />
            </div>
          </div>
        </div>
        <div className="search-result-wrapper">
<<<<<<< HEAD
          < MobileSidebar />
=======
          <div className="filter-option-container">
          </div>
>>>>>>> 204f364082ea834e151a2c2736354de6e60d9667
          <div className="filter-bar-wrapper">
            <Filterbar categoryFilter={this.handleCategoryFilter.bind(this)}       
            />   
            {displaySearchBar}
          </div>
          {display}
        </div>
      </div>

    )
  }

}

module.exports = SearchCode;



