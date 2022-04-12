document.getElementById("stockSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    const value = document.getElementById("stockInput").value;
    if (value === "")
        return;
    console.log(value);

    let url = "https://api.stockdata.org/v1/data/";
    if (document.getElementById("box").checked) {
        console.log("the box is checked");
        url += "currency/latest"
    }
    else {
        console.log("the box is not checked");
        url += "quote";
    }
    url += "?symbols=" + value + "&api_token=ahLG5yqsoIerbd7ANmQsvzNJYQwV08TffFoo5dT9";
    // let url = "https://api.stockdata.org/v1/data";

    // if (1) {
    //     url += "/currency/latest?symbols=BTCUSD,USDGBP&api_token=ahLG5yqsoIerbd7ANmQsvzNJYQwV08TffFoo5dT9";
    // }
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            let results = "";

            for (let i = 0; i < json.data.length; i++) {

                if (!document.getElementById("box").checked) {
                    results += "<h2>" + json.data[i].name + " (" + json.data[i].ticker + ")</h2>";
                    results += "<p>Exchange: " + json.data[i].exchange_short + "</p>";
                    results += "<p>Current Price: " + json.data[i].price;
                    results += " (" + json.data[i].currency + ")</p>";
                    results += "<p>Market Cap: " + json.data[i].market_cap + "</p>";
                    results += "<p>Day High: " + json.data[i].day_high + ", Day Low: " + json.data[i].day_low + "</p>";
                    results += "<p>Day change: " + json.data[i].day_change + "%</p>";
                }
                else {
                    // console.log(json.data[0])
                    results += "<h2>" + json.data[i][0].symbol + "</h2>";
                    // console.log(json.data[i][0].symbol);
                    results += "<p>Current Price: " + json.data[i][0].price + "</p>";
                    results += "<p>Market Cap: " + json.data[i][0].market_cap + "</p>";
                    results += "<p>Day High: " + json.data[i][0].day_high + ", Day Low: " + json.data[i][0].day_low + "</p>";
                    results += "<p>Day change: " + json.data[i][0].change_percent + "%</p>";
                }

            }

            if (json.data.length == 0) {
                results += "<h2>Error: Could not find data for stock symbol</h2>";
            }

            document.getElementById("stockResults").innerHTML = results;
        });
});