import React from "react";

const Book = ({book,isInreadingList,onAddToReadingList,onRemoveFromReadingList})=>{
if(!book){
    return <div>Error</div>
}
    return (

        <div className="col-md-4 book">
            <div className="card mb-4 shadow-sm">
            <img src={book.cover} alt={book.title} className="bd-placeholder-img card-img-top" />
            <h2 className="card-title">{book.title}</h2>
            <div className="card-body">
           
            <p>Paginas :{book.pages}</p>
            <p>Genero: {book.genre}</p>
            <p>Año: {book.year}</p>
            <p className="card-text">sinopsis: { book.synopsis}</p>

            { isInreadingList ? (
                <button onClick={onRemoveFromReadingList} className="btn btn-danger">
          Remover de la lista 
                </button>
            ) : (
                <button onClick={onAddToReadingList} className="btn btn-primary">
       Agregar al reading list
                </button>
            )}
            </div>
            
            </div>
           
        </div>
    );

};
export default Book;