"use strict";

var data = [{ name: "Juani dela Cruz", number: "+639221113434" }, { name: "Norah Jones", number: "+639223333434" }];

var PhoneBookApp = React.createClass({
    displayName: "PhoneBookApp",

    loadDataFromVar: function loadDataFromVar() {
        this.setState({ data: data });
    },
    handleContactSubmit: function handleContactSubmit(contact) {
        this.props.data.push(contact);
        console.log(this.props.data);
    },
    getInitialState: function getInitialState() {
        return { data: [] };
    },
    componentDidMount: function componentDidMount() {
        this.loadDataFromVar();
        setInterval(this.loadDataFromVar, this.props.pollInterval);
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "phoneBookApp" },
            React.createElement(
                "h1",
                null,
                "My PhoneBook"
            ),
            React.createElement(AddContactForm, { onContactSubmit: this.handleContactSubmit }),
            React.createElement(PhoneBookList, { data: this.props.data })
        );
    }
});

var PhoneBookList = React.createClass({
    displayName: "PhoneBookList",

    render: function render() {
        var contactNodes = this.props.data.map(function (contact) {
            return React.createElement(Contact, { name: contact.name, number: contact.number });
        });
        return React.createElement(
            "div",
            { className: "phoneBookList" },
            contactNodes
        );
    }
});

var AddContactForm = React.createClass({
    displayName: "AddContactForm",

    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var name = React.findDOMNode(this.refs.name).value.trim();
        var number = React.findDOMNode(this.refs.number).value.trim();

        if (!name || !number) {
            return;
        }
        this.props.onContactSubmit({ name: name, number: number });

        React.findDOMNode(this.refs.name).value = '';
        React.findDOMNode(this.refs.number).value = '';
        return;
    },
    render: function render() {
        return React.createElement(
            "form",
            { className: "addContactForm", onSubmit: this.handleSubmit },
            React.createElement("input", { type: "text", placeholder: "Name", ref: "name" }),
            React.createElement("input", { type: "text", placeholder: "Number", ref: "number" }),
            React.createElement(
                "button",
                { type: "submit" },
                "Add Contact"
            )
        );
    }
});

var Contact = React.createClass({
    displayName: "Contact",

    render: function render() {
        return React.createElement(
            "div",
            { className: "contact" },
            React.createElement(
                "h2",
                { className: "contactName" },
                this.props.name
            ),
            React.createElement(
                "p",
                null,
                this.props.number
            )
        );
    }
});

React.render(React.createElement(PhoneBookApp, { data: data, pollInterval: 200 }), document.getElementById('content'));