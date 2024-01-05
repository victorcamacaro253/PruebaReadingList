import axios from "axios";
import React, { useState } from "react";
import Book from "./Book";




const baseURL = "https://jsonplaceholder.typicode.com/posts";

export default function App() {
  const [post, setPost] = React.useState(null);
  const [books,setBooks]= useState([]);
  const [readingList,setReadingList]= useState([]);

  React.useEffect(() => {
    axios.get(`${baseURL}/1`).then((response) => {
      setPost(response.data);
    });

    const fetchData= async ()=>{
      try{
     const response= await axios.get('/books.json');
     setBooks(response.data.library);
      }catch (error){
console.error('Error fetching')
      }
    };
    fetchData();
  }, []);


  const addToReadingList = (book) =>{
setReadingList([...readingList,book]);
  };

  const removeFromReadingList = (book) =>{
    const updateReadingList= readingList.filter((item)=> item !== book);
    setReadingList(updateReadingList);
  };

  function generateRandomText(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  function createPost() {
    const randomtitle= generateRandomText(10);
    const randomBody= generateRandomText(50);
    axios
      .post(baseURL, {
        title:randomtitle,
        body: randomBody
      })
      .then((response) => {
        setPost(response.data);
      });
  }

  if (!post) return "No post!"

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button onClick={createPost}>Create Post</button>

<div className="container">
  <div className="row row-cols-1 rows-cols-md-3 g-4">

   <h2>Book Library</h2>
    {books.map((book,index)=>(
       <div key={index} className="book-list col-mb-4">
      <Book book={book.book} isInreadingList={readingList.some((item)=>item === book.book)} onAddToReadingList={()=> addToReadingList(book.book)}  onRemoveFromReadingList={()=> removeFromReadingList(book.book)}  />
      </div>
    ))}
     
  </div>

  <div className="row row-cols-1 rows-cols-md-3 g-4">

  <h2>Reading List</h2>
    {readingList.map((book,index)=>(
       <div key={index} className="book-list col-mb-4">
      <Book book={book} isInreadingList={true} onRemoveFromReadingList={()=>removeFromReadingList(book)} />
      </div>
    ))}
     
  </div>

</div>


   
    </div>
    
  );
}