var yo = require("yo-yo"); //za html
var csjs = require("csjs-inject"); //za css
var minixhr = require('minixhr');

//za definisane var pozivamo ih u kodu sa ${varijabla}

var links = ["https://fonts.googleapis.com/css?family=Amatic+SC|Raleway:300", "https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"];
var font = yo`<link href=${links[0]} rel='stylesheet' type='text/css'>`;
var fontAwesome = yo`<link href=${links[1]} rel='stylesheet' type='text/css'>`;
document.head.appendChild(font);
document.head.appendChild(fontAwesome);

//colours~
var blue = "rgba(16, 53, 73, 1)"; //prussian blue
var white = "rgba(239, 247, 255, 1)"; //alice blue
var pink = "rgba(130, 32, 74, 1)" //pansy purple
var teal = "rgba(85, 140, 140, 1)" //steel teal
var yellow = "rgba(232, 219, 125, 1)" //flax
var colors = [teal, blue];

//ovde ide css za body i intro
var css = csjs`
body {
  margin-top: 2em;
  background-color: ${blue};
  text-align: center;
  font-family: 'Raleway', sans-serif;
  color: ${white};
     }
h1 {
  color: rgba(105, 64, 125, 0.639216);
  font-family: 'Amatic SC', cursive;
  font-size: 6em;
  //letter-spacing: 0.1em;
  color: ${pink};
}
.intro {
  font-size: 1.5em;
  letter-spacing: 0.2em;
  margin: 3em;
}
img {
  margin-top: 5em;
  width: 15em;
  border-radius: 50%;
}
@-webkit-keyframes bounce {
  0% {
  	bottom: 20px;
  }
  70% {
  	bottom: 40px;
    color: ${yellow};
  }
  100% {
    bottom: 20px;
  }
 }
.arrow {
  position: relative;
  font-size: 2em;
  color: ${white};
  animation: bounce 2s infinite;
}
`

/*--------------------------------------------------------------------------------
  LOADING DATA
--------------------------------------------------------------------------------*/

minixhr('https://api.github.com/users/ana-esova', startPage)
function startPage (data) {
  var data = JSON.parse(data)
  document.body.appendChild(template(data))
  activateScrollEffect(colors)
}

//ovde html kod i funkcije
function template(data) {
  	return yo`
  	<div>
    	<img src="http://i.imgur.com/UhNVjKZ.jpg?1">
  		<h1>Hai there!</h1>
      <div class="${css.intro}">Welcome to Ana's page</div>
      <div>
        <i class="${css.arrow} fa fa-chevron-down" aria-hidden="true"></i>
      </div>
      ${portfolioComponent()}
  		${textboxComponent()}
  		${footerComponent()}
  	</div>
	`
}
//portfolio komponenta~

/*--------------------------------------------------------------------------------
  PORTFOLIO COMPONENT
--------------------------------------------------------------------------------*/
function portfolioComponent () {
	var css = csjs`
  	.portfolio {
      margin: 2em 0 2em 0;
      width: 100%;
    }
    .portfolioItem {
      width: 100%;
      padding-bottom: 200px;
    	background-color: ${yellow};
      color: ${yellow};
      display:flex;
      flex-direction: column;
      align-items: flex-start;
      transition: 2s;
    }
    .portfolioItem_isHover {
      width: 100%;
      padding-bottom: 200px;
    	background-color: ${blue};
      color: ${white};
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      cursor: pointer;
      transition: 2s;
    }
    .portfolioTitle {
      margin: 2em;
      padding: 0.5em;
      font-size: 3em;
      color: ${white};
      background-color: ${blue};
      border-radius: 4px;
      border: 4px solid ${yellow};
      transition: 2s;
    }
  	.portfolioTitle_isHover {
      margin: 2.5em 1.5em 2em 1.5em;
      padding: 0.5em;
      font-size: 3em;
      color: ${pink};
      background-color: ${teal};
      border-radius: 4px;
      border: 4px solid ${yellow};
      transition: 2s;
    }
    .portfolioBody {
       margin: 1em 2em 1em 2em;
      text-align: justify;
      font-size: 1.2em;
      color: ${yellow};
      transition: 2s;
    }
      .portfolioBody_isHover {
      margin: 2em 2em 1em 2em;
      text-align: justify;
      font-size: 1.2em;
      color: ${white};
      transition: 2s;
    }
  `
  function template () {
    return yo`
    <div onmouseover=${hoverPortfolio}>
      <div class="${css.portfolio}">
        <div class="${css.portfolioItem}">
          <div class="${css.portfolioTitle}">
            Portfolio: My quiz app
          </div>
          <div class="${css.portfolioBody}">
            My quiz is a quiz app where users can answer
            Likert scale questions and compare their answers
            with others. It stores all the data in the database
            and enables an admin view of all the answers.
           </div>
        </div>
      </div>
    </div>
    `
  }
  function hoverPortfolio () {
    var newElement = yo`
      <div onmouseout=${unhoverPortfolio} onclick=${openNewTab}>
        <div class="${css.portfolio}">
          <div class="${css.portfolioItem_isHover}">
            <div class="${css.portfolioTitle_isHover}">
              Portfolio: My quiz app
            </div>
            <div class="${css.portfolioBody_isHover}">
              My quiz is a quiz app where users can answer
              Likert scale questions and compare their answers
              with others. It stores all the data in the database
              and enables an admin view of all the answers.
             </div>
          </div>
        </div>
      </div>
    `
    yo.update(element, newElement)
  }
  function unhoverPortfolio() { yo.update(element, template())
  }
  function openNewTab() {
    var url = "https://ana-esova.github.io/quiz/"
    var tab = window.open(url, '_blank')
    tab.focus()
  }
  var element = template()
  return element
  }
/*--------------------------------------------------------------------------------
  TEXTBOX COMPONENT
--------------------------------------------------------------------------------*/

function textboxComponent () {
  var css = csjs`
  .textbox {
    margin: 5em 10% 3em 10%;
    color: ${white};
    font-size: 2em;
    line-height: 1.5em;
    text-align: justify;
  }
  `

  function template () {
    return yo`
      <div>
        <div class="${css.textbox}">
          Hey, did you like my stuff? Send me a message! We can talk about coding, web design or anything really. I look forward to hearing from you :)
        </div>
      </div>
    `
  }

  var element = template()
	return element
}
                         /*--------------------------------------------------------------------------------
  FOOTER COMPONENT
--------------------------------------------------------------------------------*/
function footerComponent () {
	var css = csjs`
  	.container {
      display: flex;
      justify-content: center;
    }
    .icon {
      padding: 1em;
      font-size: 35px;
      color: ${white};
    }
    .icon:hover {
      opacity: 0.4;
    }
    .madeby {
      font-size: 1.2em;
    }
    .madeByIcons {
      color: ${pink};
    }

    `

  function template () {
    return yo`
    <div>
    <div class="${css.container}">
      <a href="https://github.com/ana-esova" target="_blank">
        <i class="${css.icon} fa fa-github-alt" aria-hidden="true"></i>
      </a>
      <a href="mailto:ana.arsen@gmail.com " target="_blank">
        <i class="${css.icon} fa fa-envelope" aria-hidden="true"></i>
      </a>
      <a href="https://rs.linkedin.com/in/arsenovicana">
       <i class="${css.icon} fa fa-linkedin" aria-hidden="true"></i>
      </a>
    </div>
          <div class="${css.madeby}">
            <p>made with  <i class="${css.madeByIcons} fa fa-coffee" aria-hidden="true"></i>  and  <i class="${css.madeByIcons} fa fa-heart" aria-hidden="true"></i>  by Ana</p>
         </div>
         </div>
    `
  }

  var element = template()
  return element
}
/*-----------------------------------------------------------------------------
  HELPERS
-----------------------------------------------------------------------------*/
function activateScrollEffect (COLORS) {
  var docHeight = document.body.offsetHeight
  var colorAreaHeight = docHeight/COLORS.length
  window.addEventListener("scroll", function(event) {
    var position = document.body.scrollTop
    var i = Math.floor(position/colorAreaHeight)
    var color    = COLORS[i]
    document.body.style.backgroundColor = color
    document.body.style.transition = "background-color 3s"
  })
}

    //enable scrolling
document.querySelector('.play-button').addEventListener('click', function (event) {
  setTimeout(function () {
    var iframe = document.querySelector('iframe')
    var parent = iframe.parentElement
    parent.removeChild(iframe)
    iframe.setAttribute('scrolling', 'yes')
    parent.appendChild(iframe)
  }, 500)
})
