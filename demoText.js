$(document).ready(function () {


  function syncFn(datums) {
    console.log('datums from `local`, `prefetch`, and `#add`');
    console.log(datums);
  }

  function asyncFn(datums) {
    console.log('datums from `remote`');
    console.log(datums);
  }



  $.ajax({
    type: "method",
    url: "http://192.168.121.17:8082/dictionaries.svc/all",
    data: '{ "uuidToken": "37A083B7-A1DC-4FE1-B0D7-816B5D5DB114", "uuidEvent": "0E45E63F-AA19-44E1-9DBF-DC3EB702D113" }',
    dataType: "json",
    method: 'POST',
    contentType: "application/json",
    timeout: 360000,
    success: function (response) {

      /**
       * https://github.com/twitter/typeahead.js/blob/master/doc/bloodhound.md
       */


      /**
       * local storage
       * http://stackoverflow.com/questions/2989284/what-is-the-max-size-of-localstorage-values/2989317#2989317
       */
      var individualData = response.individualList;

      $.each(individualData, function (indexInArray, valueOfElement) {
        var tokenList = valueOfElement.name;
        valueOfElement.tokens = valueOfElement.text.split(" ");
        //<debug>
        console.log('debug', valueOfElement);
        //</debug>
      });


      var engineList = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        identify: function (obj) { return obj.uuid; },
        local: individualData
      });

      // engineList.add(individualData);

      var search = engineList.get("71D19F57-27E7-426C-9AD4-21A4903D438C");
      var query = engineList.search("key", syncFn, asyncFn);
      $('#remote .typeahead').typeahead(null, {
        name: 'best-pictures',
        display: 'value',
        source: engineList
      });


    }
  });
});