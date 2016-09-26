import React from 'react';
import { Provider } from 'react-redux';
//Router
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
//Components
import App from './app';
import SearchContainer from './search/search_container';
import BenchFormContainer from './bench_form/bench_form_container';
import BenchShowContainer from './bench_show/bench_show_container';
import ReviewFormContainer from './bench_show/review_form_container';
import SessionFormContainer from './session_form/session_form_container';



const Root = ({store}) => {

  const ensureLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (!currentUser) {
      replace('/login');
    }
  };

  const redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (currentUser) {
      replace('/');
    }
  }

  return (
    <Provider store={store}>
      <Router history={ hashHistory }>
        <Route path="/" component={ App }>
          <IndexRoute component={ SearchContainer } />
          <Route path="/login" component={ SessionFormContainer } onEnter={redirectIfLoggedIn.bind(null, store)}/>
          <Route path="/signup" component={ SessionFormContainer } onEnter={redirectIfLoggedIn.bind(null, store)}/>
          <Route path="/benches/new" component={ BenchFormContainer } onEnter={ ensureLoggedIn.bind}/>
          <Route path="/benches/:benchId" component={ BenchShowContainer} >
            <Route path="review" component={ ReviewFormContainer } onEnter={ ensureLoggedIn.bind}/>
          </Route>
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
