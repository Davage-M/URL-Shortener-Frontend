exports.createShortUrl = async function (url) {
    try {
        const response = await fetch('https://short-url-jup.herokuapp.com/create-short-url', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                longUrl: url
            })
        }
        );
        const json = await response.json();

        if (!(response.ok)) {
            throw new Error(json.error);
        }

        //console.log(json);
        return json;
    }
    catch (e) {
        return { error: e.message };
    }

}

exports.fetchAllUrls = async function () {

    try {
        const response = await fetch('https://short-url-jup.herokuapp.com/all-urls');

        const json = await response.json();

        if (!(response.ok)) {
            throw new Error(json.error);
        }

        return json;
    }
    catch (e) {
        return e.message;
    }
}

exports.deleteUrl = async function (shortUrl) {
    try {
        const response = await fetch(shortUrl, {
            method: 'DELETE',
        })

        const json = await response.json();

        if (!(response.ok)) {
            throw new Error(json.error);
        }
        //console.log(json);
        return json;
    }
    catch (e) {
        return { error: e.message }
    }
}

exports.updateUrl = async function (shortUrl, newLongUrlInput) {

    try {
        const response = await fetch(shortUrl, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                newLongUrl: newLongUrlInput
            })

        });

        const json = await response.json();

        if (!(response.ok)) {
            throw new Error(json.error);
        }

        return json;
    }
    catch (e) {
        return { error: e.message }
    }
}