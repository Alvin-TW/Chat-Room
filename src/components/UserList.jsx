import React from 'react'

import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

const UserList = ({ userlist }) => {
  const userlistElement = []

  for (let uid in userlist) {
    const [username, sex] = [userlist[uid].username, userlist[uid].sex]
    const isBoy = sex === 'boy'
    const listbkColor = isBoy ? '#99BBFF' : '#FF88C2'
    const avatarbkColor = isBoy ? '#CCDDFF' : '#FFB7DD'

    userlistElement.push(
      <ListItem
        style={{ backgroundColor: listbkColor }}
        key={uid}
        leftAvatar={<Avatar backgroundColor={avatarbkColor}> {username[0]} </Avatar>}
        primaryText={username}
      />
    )
  }

  return (
    <div>
      <Subheader>
        {`Online Users: ${Object.keys(userlist).length}`}
      </Subheader>
      <List>
        {userlistElement}
      </List>
    </div>
  )
}

export default UserList