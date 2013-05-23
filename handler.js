var 
		d = document
d.getc   = d.getElementsByClassName
d.create = d.createElement 
d.createc = function( el , cl , parent ){ 
	var el = d.create( el ); 
	el.in = function(text){ this.innerHTML = text }
	el.className = cl ; 
	return parent ? parent.appendChild( el ) : el 
}

var 
		page , head , stream , topics , footer

function init(){
		page   = d.getc( 'page'   )[0]
	,	head   = d.getc( 'Header' )[0]
	, stream = d.getc( 'Stream' )[0]
	, topics = d.getc( 'Topics' )[0]

	for( var n = dataStream.data.length - 1 ; n >= 0; n -- ){

		addNew( dataStream.data[n] )
	}

	footer = d.createc( 'p'  , 'footer'  , stream )
	footer.in("Maltsevs Ville welcome!")
}

function rollBack(){ // to do this func later
	var 
			p = d.getc('page')[0]
}

function addNew( news ){
	var 
			n   = news
		,	div     = d.createc( 'div', 'new ' + n.topic )
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

	
	caption.in( n.caption )
	topic.in  ( "# " + n.topic.toUpperCase())
	text.in   ( n.text    )
	date.in   ( n.date    )

	stream.appendChild( div )
}

window.onload = init