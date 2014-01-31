
$.get('/video_game_names.txt', function(data) {
    build_list(data);
    $("div#video_game_name0").text("Click below to generate a video game name");
});

$("div#new_name").live( "click", function(event) {
    $("div#video_game_name0").text(generate_game_name());
    $('a#tweet').each(function(){
	    $(this).attr('href', ('http://twitter.com/share?url=http://videogamena.me/&text=I made "' + $("div#video_game_name0").text() + '" with the Video Game Name Generator! Make your own: '));
	});
});

var prepositions = []
function build_prep_list(prep_list) {
    prepositions = prep_list.split("\n");
}

var word_list = new Array(3);
function build_list(big_list) {
    var words = big_list.split("\n");
    window.word_list[0] = []
    var word_list_index = 0;
    for (var word in words) {
        if (words[word] == "----") {
            word_list_index++;
            window.word_list[word_list_index] = []
        } else {
            window.word_list[word_list_index].push(words[word]);
        }
    }
}

function generate_word(i, bad_match_list) {
    var allow_similar_matches = !$('#similar_terms').is(':checked');

    var word = window.word_list[i][Math.floor(Math.random()*window.word_list[i].length)]
    var bad_words = ""
    if (word.indexOf("^") != -1) {
        bad_words = word.split("^")[1]
        word = word.split("^")[0]
    }

    if ($.inArray(word, bad_match_list) != -1) {
        return generate_word(i, bad_match_list)
    }
    bad_match_list.concat(word)
    bad_match_list.concat(bad_words)

    return word
}

function generate_modern_game_name() {
    var bml = new Array()
    return generate_word(0, bml) + " " + generate_word(1, bml) + ": " +
        generate_word(0, bml) + " " + generate_word(2, bml)
}

function generate_old_game_name() {
    var bml = new Array()
    return generate_word(0, bml) + " " + generate_word(1, bml) + " " + generate_word(2, bml)
}

function generate_game_name() {
    var PROB_OLD = 0.50
    return [generate_old_game_name(), generate_modern_game_name()][Math.random() < PROB_OLD ? 0 : 1]
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    if(typeof window.onload != 'function') {
        window.onload = func;
    }
    else {
    window.onload = function() {
        if(oldonload) {
            oldonload();
        }
        func();
    }
    }
}
