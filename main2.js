$(document).ready(function () {
    $("#entireSearch, #columnSearch").on("keyup", function () {
        let entireValue = $("#entireSearch").val().toLowerCase();
        let columnValue = $("#columnSearch").val().toLowerCase();
        let selectedColumn = $("#columnSelect").val();

        $("#onboard tr").each(function () {
            let rowText = $(this).text().toLowerCase();
            // Show all rows if entire search is empty
            let matchEntire = entireValue === ""; 

            if (entireValue !== "") {
                matchEntire = rowText.indexOf(entireValue) > -1;
            }
            // Assuming all rows initially match column search
            let matchColumn = true; 
            if (selectedColumn !== "all" && columnValue !== "") {
                let columnData = $(this).find("td:nth-child(" + 
                (selectedColumn === "RegID" ? 2 : (selectedColumn === "Surname" ? 3 : 4 ? 5 : 6 )) + ")").text().toLowerCase();
                matchColumn = columnData.indexOf(columnValue) > -1;
            }

            $(this).toggle(matchEntire && matchColumn);
        });
    });
});