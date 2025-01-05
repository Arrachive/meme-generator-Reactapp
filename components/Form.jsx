import React from "react"


export default function Main() {
  const [meme,setMeme] = React.useState({
    topText: "one does not simply",
    bottomText: "walk into mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg"
})

const[allMemes, setAllMemes] = React.useState([])

React.useState(() => {
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setAllMemes(data.data.memes))
}, [])

function handleChange(event) {
  const {value, name} = event.currentTarget
 setMeme(prevMeme => ({
  ...prevMeme,
  [name]:value
 }))
}

function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const newMemeUrl = allMemes[randomNumber].url
    setMeme(prevMeme =>({
        ...prevMeme,
        imageUrl:newMemeUrl
    }))
}

  return (
      <main>
          <div className="form">
              <label>Top Text
                  <input
                      type="text"
                      placeholder="One does not simply"
                      name="topText"
                      onChange={handleChange}
                      value={meme.topText}
                  />
              </label>

              <label>Bottom Text
                  <input
                      type="text"
                      placeholder="Walk into Mordor"
                      name="bottomText"
                      value={meme.bottomText}
                      onChange={handleChange}
                  />
              </label>
              <button onClick={getMemeImage}>Get a new meme image 🖼</button>
          </div>
          <div className="meme">
              <img src={meme.imageUrl} />
              <span className="top">{meme.topText}</span>
              <span className="bottom">{meme.bottomText}</span>
          </div>
      </main>
  )
}