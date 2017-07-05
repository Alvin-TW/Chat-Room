import React, { Component } from 'react';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

export default class UserList extends Component {
    render() {
        const userlistElement = []
        const userlist = this.props.userlist
        const usernums = Object.keys(userlist).length

        for(let uid in userlist) {
            const [ username, sex ] = [ userlist[uid].username, userlist[uid].sex ]
            const listbkColor = sex === 'boy' ? '#99BBFF' : '#FF88C2'
            const avatarbkColor = sex === 'boy' ? '#CCDDFF' : '#FFB7DD'

            userlistElement.push(<ListItem style={{ backgroundColor: listbkColor }}  key={ uid } leftAvatar={ <Avatar backgroundColor={ avatarbkColor }> { username[0] } </Avatar> }  primaryText={ username } />)
        }

        return(
            <div>
                <Subheader>
                    { `Online Users: ${usernums}` }
                </Subheader>
                <List>
                    { userlistElement }
                </List>
            </div>
        )
    }
}