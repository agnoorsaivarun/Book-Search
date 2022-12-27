import { useEffect, useState } from "react"
import '../App.css'

export default function Books() {
    const [title, setTitle] = useState("")
    const [books, setBooks] = useState([])
    const [titleBooks, setTitleBooks] = useState([])
    const[flag,setFlag]=useState(false)
    useEffect(() => {
        fetch("https://www.googleapis.com/books/v1/volumes?q=%7BbookTitle").then((res) => {
            return res.json()
        }).then((Books) => {
            // console.log(Books)
            setBooks(Books.items)
            //    console.log(books);
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    async function handleSearch() {
        await setTitleBooks(books.filter((e, i) => {
            return e.volumeInfo.title.indexOf(title) !== -1
        }))
        console.log(titleBooks);
    }
   function handleChange(e){
        setTitle(e.target.value)
    }
    return (
        <>
            <div id="nav-bar">
                <input type="text" id="search" placeholder="enter book title" value={title} onChange={(e) => handleChange(e)} />
                <input type="button" id="btn" onClick={handleSearch} value={"Search"} />
            </div>
            {title ? <div id="books">
                {titleBooks.map((ele, ind) => {
                    return (
                        <div key={`book ${ind + 1}`} className="titlebooks">
                        <a href={ele.volumeInfo.infoLink} target="_blank" rel="noreferrer"> <img onMouseOut={(e)=>setFlag(false)} onMouseOver={(e)=>setFlag(ind)} src={ele.volumeInfo.imageLinks.thumbnail} alt={ele.volumeInfo.title}/></a>
                            { flag!==false && ind===flag ? <div className="details">
                                <div>{titleBooks[flag].volumeInfo.title}</div>
                                <div>{titleBooks[flag].volumeInfo.authors[0]}</div>
                                <div>{titleBooks[flag].volumeInfo.pageCount}</div>
                                <div>{titleBooks[flag].volumeInfo.maturityRating}</div>
                            </div> : null }                            
                        </div>
                    )
                })
                }
            </div> : null}
        </>
    )
}