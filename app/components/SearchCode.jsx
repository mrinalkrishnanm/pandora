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

class SearchCode extends React.Component{
  constructor(){
    super()
    this.state = {
      isSearching: false,
      newResult: [],
      isWeb: false,
      isMobile: false,
      isSnippet: false,
      isExercise: false,
      noMatchFlag: false
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({isSearching:true})

    var difficulty = this.state.difficulty
    var language = this.state.language
    var keyword = this.refs.keyword.value

    var _data  = {

      difficulty: difficulty,
      language: language,
      keyword: keyword

    }

    var _this = this
    var url = API.url('codes/search')
    var success = function(res) {
      console.log(res)
      _this.setState({result : res})
    }
    var failure = function(res) {
      console.log(res) 
    }
    API.post(url,_data,success,failure);

  }
  changeLang(val) {
    this.setState({ language: val})
    console.log(val)
  }
  changeDiff(val) {
    this.setState({ difficulty: val})
  }

  filterWeb(e) {
    var node = e.target
    var result = this.state.result
    var isWeb = this.state.isWeb

    if(!isWeb)
      var newResult = _.filter(result, (o) => {
        return o.category=="web"
      })
      else
        var newResult = this.state.result

      console.log(result)
      console.log(newResult)
      if(_.isEmpty(newResult))
        {
          this.setState({noMatchFlag: true,
                        isWeb: !isWeb,
                        isMobile: false,
                        isSnippet: false,
                        isExercise: false,
                        newResult: newResult})
        }
        else
          this.setState({isWeb: !isWeb,
                        isMobile: false,
                        isSnippet: false,
                        isExercise: false,
                        noMatchFlag: false,
                        newResult: newResult
          })                 

  }

  filterMobile(e) {
    var result = this.state.result
    var isMobile = this.state.isMobile

    if(!isMobile)
      var newResult = _.filter(result, (o) => {
        return o.category=="mobile"
      })
      else
        var newResult = this.state.result

      console.log(result)
      console.log(newResult)
      if(_.isEmpty(newResult))
        {
          this.setState({noMatchFlag: true,
                        isMobile: !isMobile,
                        isWeb: false,
                        isSnippet: false,
                        isExercise: false,

                        newResult: newResult})
        }
        else
          this.setState({isMobile: !isMobile,
                        noMatchFlag: false,
                        isWeb: false,
                        isSnippet: false,
                        isExercise: false,

                        newResult: newResult
          })                 

  }

  filterExercise(e) {
    var result = this.state.result
    var isExercise = this.state.isExercise

    if(!isExercise)
      var newResult = _.filter(result, (o) => {
        return o.category=="exercise"
      })
      else
        var newResult = this.state.result

      console.log(result)
      console.log(newResult)
      if(_.isEmpty(newResult))
        {
          this.setState({noMatchFlag: true,
                        isExercise: !isExercise,
                        isMobile: false,
                        isSnippet: false,
                        isWeb: false,

                        newResult: newResult})
        }
        else
          this.setState({isExercise: !isExercise,
                        isMobile: false,
                        isSnippet: false,
                        isWeb: false,
                        noMatchFlag: false,
                        newResult: newResult
          })                 

  }

  filterSnippet(e) {
    var result = this.state.result
    var isSnippet = this.state.isSnippet

    if(!isSnippet)
      var newResult = _.filter(result, (o) => {
        return o.category=="snippet"
      })
      else
        var newResult = this.state.result

      console.log(result)
      console.log(newResult)
      if(_.isEmpty(newResult))
        {
          this.setState({noMatchFlag: true,
                        isSnippet: !isSnippet,
                        isMobile: false,
                        isWeb: false,
                        isExercise: false,

                        newResult: newResult})
        }
        else  
          this.setState({isSnippet: !isSnippet,
                        isMobile: false,
                        isWeb: false,
                        isExercise: false,

                        noMatchFlag: false,
                        newResult: newResult
          })                 

  }


  render(){

    var options = [
      { value: 'ruby', label: 'Ruby' },
      { value: 'python', label: 'Python' }
    ];

    var d_options=[
      { value: 'easy', label: 'Easy'},
      { value: 'medium', label: 'Medium'},
      { value: 'hard', label: 'Hard'}
    ];

    var display_none = <h2> No Results </h2>
    var language = this.state.language

    var difficulty = this.state.difficulty
    var flag = this.state.noMatchFlag
    var isWeb = this.state.isWeb
    var isMobile = this.state.isMobile
    var isSnippet = this.state.isSnippet
    var isExercise = this.state.isExercise

    if(flag)
      var display = display_none
    else if(isWeb || isMobile || isSnippet || isExercise)
      var display = <CodeResultList codes={this.state.newResult} />
    else if(!_.isEmpty(this.state.result))
      var display = <CodeResultList codes={this.state.result} />
    else
      var display = display_none

    return(
      <div className="search-code-container">
        <UserNavbar />
        <div className="search-wrapper">
          <h2>Keyword</h2>
          <h2>Language</h2>
          <h2>Difficulty</h2>
          <input ref="keyword" type="text" placeholder="Enter keyword" />


          <Select
            name="language-selectname"
            className='select'
            value={language}
            onChange={this.changeLang.bind(this)}
            searchable={false}
            options={options}
          />

        <Select
          name="difficulty-select"
          className='select'
          onChange={this.changeDiff.bind(this)}
          searchable={false}
          value={difficulty}
          options={d_options}
        />



      <button onClick={this.handleSubmit.bind(this)} 
        className="search-button"> Search </button>

    </div>
    <Filterbar
      web={this.filterWeb.bind(this)}
      snippet={this.filterSnippet.bind(this)}
      exercise={this.filterExercise.bind(this)}
      mobile={this.filterMobile.bind(this)}          
    />
    {display}
  </div>

    )
  }

}

module.exports = SearchCode;



