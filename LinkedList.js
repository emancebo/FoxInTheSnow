function LinkedList () {
	this.head = null;
	this.tail = null;
	this.size = 0;
}

function LinkedListNode(data) {
	this.data = data;
	this.next = null;
	this.prev = null;
}

function LinkedListIterator (list) {
	this.list = list;
	this.curNode = list.head;
}

LinkedList.prototype.push = function (element) {
	var node = new LinkedListNode(element);
	if (this.head == null) {
		this.head = this.tail = node;
	}
	else {
		this.tail.next = node;
		node.prev = this.tail;
		this.tail = node;
	}
	++this.size;
}

LinkedList.prototype.iterator = function () {
	return new LinkedListIterator(this);
}

LinkedListIterator.prototype.hasNext = function () {
	if (this.curNode == null)
		return false;
	return this.curNode.next != null;
}

LinkedListIterator.prototype.next = function () {
	this.curNode = this.curNode.next;
	return this.curNode.data;
}

// removes current element iterator is on
LinkedListIterator.prototype.remove = function () {
	if (this.curNode == null)
		return;
		
	if (this.curNode.next != null) {
		this.curNode.next.prev = this.curNode.prev;
	}
	else {
		this.list.tail = this.curNode.prev;
	}
	
	if (this.curNode.prev != null) {
		this.curNode.prev.next = this.curNode.next;
	}
	else {
		this.list.head = this.curNode.next;
	}
	
	var placeholder = new LinkedListNode();
	placeholder.next = this.curNode.next;
	this.curNode = placeholder;
	
	--this.list.size;
}