var 
		d = document
	,	beenVisible = 0
	, timer = null
	,	colors = [ "#F5DCF7" , "#6ADE82" ,  "#D4F1FC" , "#79E6E8"  , "#F07A2B"  ]

	, defColor = colors[ 0 ]

d.getc   = d.getElementsByClassName
d.create = d.createElement 
d.createc = function( el , cl , parent ){ 
	var el = d.create( el ); 
	el.in = function(text){ this.innerHTML = text }
	el.className = cl ; 
	return parent ? parent.appendChild( el ) : el 
}

var 
		page , head , stream , topics , footer , topicsList = [ "all" ]

function init(){
		page   = d.getc( 'page'   )[0]
	,	head   = d.getc( 'Header' )[0]
	, stream = d.getc( 'Stream' )[0]
	, topics = d.getc( 'Topics' )[0]

	for( var n = dataStream.data.length - 1 ; n >= 0; n -- ){
		addNew( dataStream.data[n] )
	}

	initTopicsList()
	paintTopics()

	footer = d.createc( 'p'  , 'footer'  , stream )
	footer.in("Maltsevs Ville welcome!")
	d.body.style.backgroundColor = defColor
	d.getc('Stream')[0].onmousemove = function(){ d.body.style.backgroundColor = defColor ; changes() ;}
}

function paintTopics(){
	var ts = d.getc( 'topic' )
	for( var i = ts.length - 1 ; i >=0 ; i-- ){
		var realTopic = d.getc( "topicInList " + ts[i].topic )[0]
		ts[i].style.backgroundColor = realTopic.style.backgroundColor
		ts[i].onclick     = clickOnTopic
	}
}

function rollBack(){ // to do this func later
	var 
			p = d.getc('page')[0]
}

function addNew( news ){
	var 
			n   = news
		,	div     = d.createc( 'div', 'new ' + n.topic.toLowerCase() )
		, caption = d.createc( 'p'  , 'caption' , div )
		, topic   = d.createc( 'p'  , 'topic'   , div )
		, text    = d.createc( 'p'  , 'text'    , div )
		, date    = d.createc( 'p'  , 'date'    , div )

	for( var i in n.images ){
		var pass = n.images[i]
			,	im   = d.createc( 'img'  , 'image'  , div )

		im.src = 'images/' + pass
	}

	d.createc( 'hr' , 'downhr', div )

	//n.topic = n.topic.toUpperCase()
	caption.in( n.caption )
	topic.in  ( "# " + n.topic )
	text.in   ( n.text    )
	date.in   ( n.date    )

	stream.appendChild( div )

	if( topicsList.indexOf( n.topic )==-1 )
		topicsList.push( n.topic )
	topic.topic = n.topic.toLowerCase()
}

function clickOnTopic(){
	var news = d.getc('new')
	for( var i = news.length - 1 ; i >= 0 ; i-- )
		news[i].style.display='none'
	var t = this.topic
	news = d.getc( t == 'all' ? 'new' : this.topic)
	for( var i = news.length - 1 ; i >= 0 ; i-- )
		news[i].style.display='block'
	defColor = this.style.backgroundColor
	d.body.style.backgroundColor = defColor
}

function addTopic( name ){
	var 
			topics = d.getc( 'Topics' )[0]
		, topic  = d.createc( 'p'  , 'topicInList ' + name.toLowerCase()   , topics )
		

	topic.topic = name.toLowerCase()
	topic.in( "# " + name )
	topic.onmousemove = function(){ d.body.style.backgroundColor = this.style.backgroundColor }
	topic.onclick     = clickOnTopic
	topic.style.backgroundColor = colors.shift()
}

function changes(){
	if(!beenVisible)
		d.getc( 'Topics' )[0].style.opacity = 1;
	beenVisible = 100
	if(!timer)
		timer = setInterval( countDown , 50 )
	d.getc( 'Topics' )[0].style.visibility = 'visible'
	
}

function countDown(){
	beenVisible--
	if( !beenVisible ){
		clearInterval( timer )
		timer = null
		d.getc( 'Topics' )[0].style.opacity = 0
	}
}

function initTopicsList(){
	for( var t in topicsList )
		addTopic( topicsList[t] )
}

window.onload = init
window.onscroll = changes
window.onmousedown = changes
window.onmouseup   = changes
















