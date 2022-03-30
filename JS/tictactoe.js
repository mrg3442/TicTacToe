//This Var keeps track of whos turn it is
let activePlayer = 'X';
//This array stores an array of moves. This is used to determine win conditions
let selectedSqaures =[];

//This function is for placing an X or O
function placeXorO(squareNumber) {
    //This condition insures a sqaure has not been selected already
    //The .some() method here is used to check each element of the selectedSqaure array
    //to see if the sqaure number has been clicked on
    if(!selectedSqaures.some(element => element.includes(squareNumber))){
        let select = document.getElementById(squareNumber);
        //This condition checks whos turn it is
        if(activePlayer === 'X') {
            //If active player eqauls X the x.png is placed in html
            select.style.backgroundImage ='url("images/x2.png")';
            //active player can only be a X or O so if not X then O
        }else{
            //If active played equals O then o.png is placed
            select.style.backgroundImage = 'url("images/o3.jpg")';
        }
        //sqaureNumber and activePlayer are concatenated together and added to array
        selectedSqaures.push(squareNumber + activePlayer);
        //This calls a function to check for win condition
        checkWinConditions();
        //This condition is for changing active player
        if(activePlayer === 'X') {
            //if player is X change to O
            activePlayer = 'O';
            //If active player is anything other then x
        }else {
            //changes active player to x
            activePlayer = 'X';
        }

        //This function plays placement sound
        audio('./media/place.mp3');
        //this condition checks to see if its computer turn.
        if(activePlayer === 'O') {
            //This function disables clicking for computer choice
            disableClick();
            //This function waits 1 second before computer places img and enables click
            setTimeout(function() { computersTurn(); },1000)
        }
        //returning true is needed for computersTurn() function to work.
        return true;
    }
    //this function results in a randowm sqaure to be selected
    function computersTurn() {
        //This boolean is needed for while loop
        let success = false;
        //This var stores a num 0-8
        let pickASqaure;
        //This condition allows while loop to keep trying if a sqaure is selected already
        while(!success) {
            //A random number between 0 and 8 is selected
            pickASqaure = String(Math.floor(Math.random() * 9));
            //If random number returns true the sqaure has not been selected yet
            if(placeXorO(pickASqaure)) {
                //this line calls the function
                placeXorO(pickASqaure);
                //This changes our boolean and ends the loop
                success = true;
            }
        }
    }
}

    function checkWinConditions() {
        //This function parses the selectedSqaures array to check for win conditions
        //drawWinLine function is called to draw a line if the win condition is met
        // X 0, 1, 2 condition
        if(arrayIncludes('0X', '1X', '2X')) {drawWinLine(50, 100, 558, 100) }
        // X 3, 4, 5 condition 
        else if(arrayIncludes('3X', '4X', '5X')) {drawWinLine(50, 304, 558, 304) }
        // X 6, 7, 8 condition
        else if(arrayIncludes('6X', '7X', '8X')) {drawWinLine(50, 508, 558, 508) }
        // X 1, 4, 7 condition
        else if(arrayIncludes('1X', '4X', '7X')) {drawWinLine(100, 50, 100, 558) }
        // X 2, 5, 8 condition
        else if(arrayIncludes('2X', '5X', '8X')) {drawWinLine(508, 50, 508, 558) }
        // X 6, 4, 2 condition
        else if(arrayIncludes('6X', '4X', '2X')) {drawWinLine(100, 508, 510, 90) }
        // X 0, 4, 8 condition
        else if(arrayIncludes('0X', '4X', '8X')) {drawWinLine(100, 100, 520, 520) }
        // X 0, 3, 6 condition
        else if(arrayIncludes('0X', '3X', '6X')) {drawWinLine(100, 50, 100, 558) }
        // O 0, 1, 2 condition
        else if(arrayIncludes('0O', '1O', '2O')) {drawWinLine(50, 100, 558, 100) }
        // O 3,4,5 condition 
        else if(arrayIncludes('3O', '4O', '5O')) {drawWinLine(50, 304, 558, 304) }
        // O 6, 7, 8 condition
        else if(arrayIncludes('6O', '7O', '8O')) {drawWinLine(50, 508, 558, 558) }
        // O 1, 4, 7 condition
        else if(arrayIncludes('1O', '4O', '7O')) {drawWinLine(100, 50, 100, 558) }
        // O 2, 5, 8 condition
        else if(arrayIncludes('2O', '5O', '8O')) {drawWinLine(508, 50, 508, 558) }
        // O 6, 4, 2 condition
        else if(arrayIncludes('6O', '4O', '2O')) {drawWinLine(100, 508, 510, 90) }
        // X 0, 3, 6 condition
        else if(arrayIncludes('0O', '3O', '6O')) {drawWinLine(100, 50, 100, 558) }
        // X 0, 3, 6 condition
        else if(arrayIncludes('0O', '3O', '6O')) {drawWinLine(100, 50, 100, 558) }
        // O 0, 4, 8 condition
        else if(arrayIncludes('0O', '4O', '8O')) {drawWinLine(100, 100, 520, 520) }
        // This condition checks for tie if none of above are true and 9 sqaures are selected code exucutes
        else if(selectedSqaures.length >= 9) {
            //Function plays tie game sound
            audio('./media/tie2.mp3');
            //function returns a 2 second timer before reset game
            setTimeout(function () { resetGame(); }, 2000);
        }

        //This function checks to see if array includes 3 strings 
        //used to check for each win condition
        function arrayIncludes(sqaureA, sqaureB, sqaureC) {
            // these 3 var will be used to check for 3 in a row
            const a = selectedSqaures.includes(sqaureA)
            const b = selectedSqaures.includes(sqaureB)
            const c = selectedSqaures.includes(sqaureC)
            //if the 3 passed are all included in our array true is
            //returned and our else if executes the drawWinLine function
            if(a === true && b === true && c === true) {return true}
        }
    }

    //This function makes body element temp unclickable
    function disableClick(){
        //makes body unclickable
        body.style.pointerEvents = 'none';
        //makes body clickable after 1 second
        setTimeout(function () {body.style.pointerEvents = 'auto';}, 1000);
    }

    //this function takes a string parameter of the path of the placement audio
    function audio(audioURL) {
        //creates audio object and passes paramater
        let audio = new Audio(audioURL)
        //plays audio sound
        audio.play();
    }

    //this function uses html canvas to draw win lines
    function drawWinLine(coordX1, coordY1, coordX2, coordY2){
        //accesses html canvas
        const canvas = document.getElementById("win-lines");
        //gives us access to to methods and properties to use on canvas
        const c = canvas.getContext('2d');
        //indicates start of X axis is
        let x1 = coordX1,
            //start of y axis
            y1 = coordY1,
            //end of x axis
            x2 = coordX2,
            //end of y axis
            y2 = coordY2,
            //stores temp x axis data we update in our animiation loop
            x = x1,
            // stores temp y axis data we update in our animation loop
            y = y1;


            // this function interacts with the canvas
            function animateLineDrawing() {
                //this var creates loop
                const animationLoop = requestAnimationFrame(animateLineDrawing);
                //this method clears content from the last loop iteration
                c.clearRect(0, 0, 608, 608)
                //begins a new path
                c.beginPath();
                //this method moves us to a new starting point for our line
                c.moveTo(x1, y1);
                //indicates end point in line
                c.lineTo(x,y);
                //line width
                c.lineWidth = 10;
                // sets line color
                c.strokeStyle = 'rgba(70, 225, 33, .8)';
                //draws everything above
                c.stroke();
                //checks to see if endpoint reached
                if (x1 <= x2 && y1 <= y2) {
                    //adds 10 to the previous x pointer
                    if(x <x2) {x+=10;}
                    //adds 10 to the previous y pointer
                    if(y < y2) {y+=10;}
                    //cancels animation loop if end points reached
                    if(x >= x2 && y >= y2) {cancelAnimationFrame(animationLoop);}
                }
                //necassary for 6,4,2 win condition
                if(x1 <= x2 && y1 >=y2) {
                    if(x < x2) {x+=10;}
                    if(y > y2) {y-=10;}
                    if(x >= x2 && y<= y2) {cancelAnimationFrame(animationLoop)}
                }
            }


        //this function clears our canvas after win line is drawn
        function clear() {
            //starts animation loop
            const animationLoop = requestAnimationFrame(clear);
            //clears frame
            c.clearRect(0, 0, 608, 608);
            //stops animation loop
            cancelAnimationFrame(animationLoop);
        }
        //this line disallows clicking while the win sound is playing
        disableClick();
        //plays win sounds
        audio('./media/win2.mp3');
        //calls main animation loop
        animateLineDrawing();
        //waits 1 second clears canvas resets game
        setTimeout(function () {clear(); resetGame();}, 1000);
    }

    // this function restarts game in event of a tie or win
    function resetGame() {
        // for loop iterates through each html sqaure element
        for (let i = 0; i < 9; i++) {
            //gets the html element of i
            let sqaure = document.getElementById(String(i));
            //removes elements of background image
            sqaure.style.backgroundImage ="";
        }
        //resets array so is empty and we can start over
        selectedSqaures =[];
    }
