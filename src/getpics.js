let http = require('https');
let fs = require('fs');
let request = require('request');
let url = 'https://instagram.codev.wixapps.net/media/recent/325478516?instanceId=140fa242-480f-97aa-8df8-5d8c81fa2fda&compId=comp-ig2skyg3'
let n = 0;
let getPics = function (url) {
	http.get(url, function (res) {
		let d = '';
		res.on('data', function (data) {
			d += data;
		});
		res.on('end', function () {
			let j = JSON.parse(d)
			for (let i = 0; i < j.data.length; i++) {
				n++;
				let pic_url = j.data[i].images.standard_resolution.url.replace(/s640x640/g, 's1080x1080');
        request
          .get(pic_url)
          .on('error', function(err) {
            console.log(err)
          })
          .pipe(fs.createWriteStream('./assets/' + n + '.jpg'));
				console.log( n + '.jpg saved')
			}
			if (j.meta.code && j.meta.code === 200 && j.pagination.next_url) {
				getPics(j.pagination.next_url)
			}
		})
	})
}
getPics(url)
