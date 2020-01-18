const fs = require('fs');
// const pdf = require('html-pdf');
// const axios = require("axios");

const colors = {
    green: {
        wrapperBackground: "#E6E1C3",
        headerBackground: "#C1C72C",
        headerColor: "black",
        photoBorderColor: "#black"
    },
    blue: {
        wrapperBackground: "#5F64D3",
        headerBackground: "#26175A",
        headerColor: "white",
        photoBorderColor: "#73448C"
    },
    pink: {
        wrapperBackground: "#879CDF",
        headerBackground: "#FF8374",
        headerColor: "white",
        photoBorderColor: "#FEE24C"
    },
    red: {
        wrapperBackground: "#DE9967",
        headerBackground: "#870603",
        headerColor: "white",
        photoBorderColor: "white"
    }
};

function generateHTML(data) {
    return `
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
    <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
    <title>Github Profile for: ${data.username}</title>
    <style>
        @page {
            margin: 0;
        }
        *,
        *::after,
        *::before {
            box-sizing: border-box;
        }
        html,
        body {
            padding: 0;
            margin: 0;
        }
        html,
        body,
        .wrapper {
            height: 100%;
        }
        .wrapper {
            background-color: ${colors[data.color].wrapperBackground};
            padding-top: 100px;
        }
        body {
            background-color: white;
            -webkit-print-color-adjust: exact !important;
            font-family: 'Cabin', sans-serif;
        }
        main {
            background-color: #E9EDEE;
            height: auto;
            padding-top: 20px;
            padding-bottom: 5px;
        }
        h1,
        h2,
        h3,
        h4,
        h5 {
            font-family: 'BioRhyme', serif;
            margin: 0;
        }
        h1 {
            font-size: 3em;
        }
        h2 {
            font-size: 2.5em;
        }
        h3 {
            font-size: 2em;
        }
        h4 {
            font-size: 1.5em;
        }
        h5 {
            font-size: 1.3em;
        }
        
        .photo-header {
            position: relative;
            margin: 0 auto;
            margin-bottom: -50px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            background-color: ${colors[data.color].headerBackground};
            color: ${colors[data.color].headerColor};
            padding: 10px;
            width: 95%;
            border-radius: 6px;
            text-align: center;
        }
        .photo-header img {
            width: 250px;
            height: 250px;
            border-radius: 50%;
            object-fit: cover;
            margin-top: -75px;
            border: 6px solid ${colors[data.color].photoBorderColor};
            box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
            background-color: white;
        }
        .photo-header h1,
        .photo-header h3,
        .photo-header h5 {
            width: 100%;
            text-align: center;
        }
        .photo-header h1 {
            margin-top: 10px;
        }
        .links-nav {
            width: 100%;
            text-align: center;
            padding: 20px 0;
            font-size: 1.1em;
        }
        .nav-link {
            display: inline-block;
            margin: 5px 10px;
        }
        .workExp-date {
            font-style: italic;
            font-size: .7em;
            text-align: right;
            margin-top: 10px;
        }
        .container {
            padding: 50px;
            padding-left: 100px;
            padding-right: 100px;
        }
        .row {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 15px;
            margin-bottom: 15px;
        }
        .card {
            padding: 15px;
            border-radius: 6px;
            background-color: ${colors[data.color].headerBackground};
            color: ${colors[data.color].headerColor};
            margin: 15px;
        }
        .col {
            flex: 1;
            text-align: center;
        }
        a,
        a:hover {
            text-decoration: none;
            color: inherit;
            font-weight: bold;
        }
        @media print {
            body {
                zoom: .70;
            }
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="photo-header">
            <img src="${data.img}" alt="profile image">
            <h5>${data.login}</h5>
            <h1>Hi! My name is ${data.name}.</h1>
            <h4>${data.bio}</h4>
            <div class="links-nav">
                <a class="nav-link" href="${data.map}" target="_blank"> 
                    <i class="fas fa-location-arrow"></i>
                    <span> ${data.location} </span>
                </a>
                <a class="nav-link" href="${data.url}" target="_blank">
                    <i class="fab fa-github"></i>
                    <span> Github </span>
                </a>
                <a class="nav-link" href="${data.blog}" target="_blank">
                    <i class="fas fa-rss-square"></i>
                    <span> Blog </span>
                </a>
            </div>
        </div>
        <main>
            <div class="container">
                <div class="row">
                    <div class="col card">
                        <h3>Public Repositories</h3>
                        <h5>${data.publicRepos}</h5>
                    </div>
                    <div class="col card">
                        <h3>Followers</h3>
                        <h5>${data.followers}</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col card">
                        <h3>Github Stars</h3>
                        <h5>${data.stars}</h5>
                    </div>
                    <div class="col card">
                        <h3>Following</h3>
                        <h5>${data.following}</h5>
                    </div>
                </div>
            </div>
        </main>
    </div>
</body>
</html>`;
}

module.exports = {
    colors: colors,
    generateHTML: generateHTML,
}