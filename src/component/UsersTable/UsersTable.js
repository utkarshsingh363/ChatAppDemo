import React from "react";
import MaterialTable from "material-table";

import EditIcon  from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import ChatIcon from '@material-ui/icons/Chat';


export default function PositioningActionsColumn(props) {
  return (
    <MaterialTable
      title="List of Users"
      columns={[
        { title: "ID", field: "id", editable: "never" },
        { title: "Name", field: "Name" },
        { title: "Company", field: "Company" }
      ]}
      data={props.userList
        .filter(user => user.id != props.activeUser)
        .map(user => {
          return { id: user.id, Name: user.Name, Company: user.Company };
        })}
      actions={[
        rowData => ({
          icon: DeleteIcon,
          tooltip: "Delete User",
          onClick: (event, rowData) => props.removeUser(rowData),
          // console.log(rowData),
        }),
        rowData=>({
          icon: ChatIcon,
          tooltip: "Chat User",
          onClick: (event, rowData) => {
            // props.chatting(rowData.Name)
            if(rowData.id>4){
              alert('Chat not supported for newly added users')
            }else{

                props.chatting(rowData.Name)
                props.turnChatOn()

              // console.log(rowData.Name)
            }
          },
        }) 
      ]}
      options={{
        actionsColumnIndex: -1
      }}
      editable={{
        icon:EditIcon,
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...props.userList];
              const index = oldData.tableData.id;
              dataUpdate[index + 1] = newData;
              props.updateUser([...dataUpdate]);

              resolve();
            }, 1000);
          })
      }}
    />
  );
}
