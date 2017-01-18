$(document).ready(function () {
  var subStringMatcher = function (strs) {
    return function findMatches(q, cb) {
      var matches = [],
        subStringRegex = new RegExp(q, 'i');
      $.each(strs, function (i, str) {
        if (subStringRegex.test(str)) {
          matches.push(str);
        }
      });
      cb(matches);
    };
  };


  $.ajax({
    type: "method",
    url: "http://192.168.121.17:8082/dictionaries.svc/all",
    data: '{ "uuidToken": "37A083B7-A1DC-4FE1-B0D7-816B5D5DB114", "uuidEvent": "0E45E63F-AA19-44E1-9DBF-DC3EB702D113" }',
    dataType: "json",
    method: 'POST',
    contentType: "application/json",
    timeout: 360000,
    success: function (response) {
      //<debug>
      console.log('response request', new Date());
      console.log('response', response);
      //</debug>

      var individualJson = response.individualList;
      $.each(individualJson, function (indexInArray, valueOfElement) {
        //<debug>
          console.log('debug', arguments);
        //</debug>

        var tokenList = valueOfElement.name;
        valueOfElement.tokens =[];
      });
      var individualList = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: response.individualList
      });


      $(".the-basic .typehead").typehead({
        hint: true,
        highlight: true,
        minLength: 1
      }, {
          name: 'idividuals',
          source: individualList
        });
    }
  });
});