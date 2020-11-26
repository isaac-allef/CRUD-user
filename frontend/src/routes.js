import { BrowserRouter, Route, Switch } from 'react-router-dom';

import UserList from './pages/userList';
import UserCreate from './pages/userCreate';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={UserList} />
                <Route path="/create" component={UserCreate} />
            </Switch>
        </BrowserRouter>
    );
}