$(function() {
	function randomString() {
	var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var str = '';
	var i = 0;
	for (i = 0; i < 10; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}

	return str;
}

// Klasa Column

function Column(name) {
	var self = this;
	this.id = randomString();
	this.name = name;
	this.$element = createColumn();

	function createColumn() {
		// Tworzenie elementów skladowych kolumny

		var $column = $('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('btn-delete').text('x');
		var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');
		
		// Podpinanie zdarzeń
		$columnDelete.click(function() {
			self.removeColumn();
		});

		$columnAddCard.click(function() {
			self.addCard(new Card(prompt('Wpisz nazwę karty')));
		});

		// Konstruowanie elementu kolumny
		$column.append($columnTitle)
						.append($columnDelete)
						.append($columnAddCard)
						.append($columnCardList);

		// Zwracanie stworzonej kolumny
		return $column;
	}
}

Column.prototype = {
	addCard: function(card) {
		this.$element.children('ul').append(card.$element);
	},

	removeColumn: function() {
		this.$element.remove();
	}
};

function Card(description) {
	var self = this;

	this.id = randomString();
	this.description = description;
	this.$element = createCard();

	function createCard() {
		//Tworzenie klocków
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<span>').addClass('card-description').text(self.description);
		var $cardDelete = $('<button>').addClass('btn-delete').text('x');

		// Przypięcie zdarzenia
		$cardDelete.click(function() {
			self.removeCard();
		});

		// Składanie i zwracanie karty
		$card.append($cardDelete)
					.append($cardDescription);

		return $card;
	}
}

Card.prototype = {
	removeCard: function() {
		this.$element.remove();
	}
}

var board = {
	name: 'Tablica Kanban',
	addColumn: function(column) {
		this.$element.append(column.$element);
		initSortable();
	},

	$element: $('#board .column-container')
}

function initSortable() {
	$('.column-card-list').sortable({
		connectWith: '.column-card-list',
		placeholder: 'card-placeholder'
	}).disableSelection();
}

$('.create-column').click(function() {
	var name = prompt('WPISZ NAZWĘ KOLUMNY');
	var column = new Column(name);
	board.addColumn(column);
});

//Tworzenie kolumn
var toDoColumn = new Column('DO ZROBIENIA');
var doingColumn = new Column('W TRAKCIE');
var doneColumn = new Column('UKOŃCZONE');

//Dodawanie kolumn do tablicy
board.addColumn(toDoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

//Tworzenie nowych egzemplarzy kart
var card1 = new Card('NOWE ZADANIE');
var card2 = new Card('STWORZYĆ TABLICĘ KANBAN');

// Dodawanie kart do kolumn
toDoColumn.addCard(card1);
doingColumn.addCard(card2);
});