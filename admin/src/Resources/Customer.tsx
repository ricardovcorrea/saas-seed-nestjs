import React from 'react';
import { List, Datagrid, TextField, SimpleForm, Create, TextInput, Edit, NumberField, ReferenceField, DateField } from 'react-admin';

export const CustomerList = (props: any) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="slug" />
            <div><a href="#">Show secret key</a></div>
        </Datagrid>
    </List>
);

//   export const QuestionCreate = (props:any) => (
//     <Create {...props}>
//         <SimpleForm>
//             <TextInput source="title" />
//             <TextInput source="answer1"/>
//             <TextInput source="answer2"/>
//             <TextInput source="answer3"/>
//             <TextInput source="answer4"/>
//             <TextInput source="correct_answer"/>
//             <TextInput source="theme_id"/>
//         </SimpleForm>
//     </Create>
//   );

//   export const QuestionEdit = (props:any) => (
//     <Edit {...props}>
//         <SimpleForm>
//             <TextInput source="title" />
//             <TextInput source="answer1"/>
//             <TextInput source="answer2"/>
//             <TextInput source="answer3"/>
//             <TextInput source="answer4"/>
//             <TextInput source="correct_answer"/>
//             <TextInput source="theme_id"/>
//         </SimpleForm>
//     </Edit>
//   );