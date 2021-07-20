import { useState } from 'react';
import Head from 'next/head'
import Container from '@material-ui/core/Container';
import SubmitBlogPostForm from '../components/SubmitBlogPostForm'
import styles from '../styles/Home.module.css'

import { ADD_BLOGPOST, DELETE_BLOGPOST, EDIT_BLOGPOST } from "../graphql/queries";
import { useMutation } from "@apollo/client";
import EditModal from "../components/EditModal"



import BlogPosts from "../components/BlogPosts";

export default function Home() {

  const [addBlogPost] = useMutation(ADD_BLOGPOST, {
    onCompleted: (data) => {
      window.location.reload()
    }
  })

  const onSubmit = (e) => {
    e.preventDefault()
    addBlogPost({variables: {text: e.target.text.value}})
  }

  const [deleteBlogPost] = useMutation(DELETE_BLOGPOST, {
    onCompleted: (data) => {
      window.location.reload()
    }
  })

  const onDelete = (id) => {
    deleteBlogPost({variables: {id}})
  }

  const [editId, setEditId] = useState("")

  const onClose = () => {
    setEditId("")
  }

  const openModal = (id) => {
    setEditId(id)
  }

  const [editBlogPost] = useMutation(EDIT_BLOGPOST, {
    onCompleted: () => setEditId("")
  })

  const onSaveEdit = (e) => {
    e.preventDefault()
    editBlogPost({variables: {id: editId, text: e.target.text.value}})
  }


  return (
    <Container maxWidth="xs">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <EditModal isOpen={!!editId} onClose={onClose} onSubmit={onSaveEdit} />
      <SubmitBlogPostForm onSubmit={onSubmit}/>
      <BlogPosts onDelete={onDelete}  openModal={openModal}/>
    </Container>
  );
}
