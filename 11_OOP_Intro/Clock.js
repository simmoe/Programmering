console.log('Clock is here')

//Når en klasses objekter kan opføre sig forskelligt afhængig af argumenter i contructoren 
//Kaldes det POLYMORFI
class Clock {
    //constructoren er klassens "setup" funktion, som kaldes når nye objekter fra klassen oprettes 
    constructor(div, style){
        this.div = div
        this.style = style

        //div's for hours, minutes, seconds
        this.hDiv = createDiv()
        this.mDiv = createDiv()
        this.sDiv = createDiv()
        this.div.child(this.hDiv)
        this.div.child(this.mDiv)
        this.div.child(this.sDiv)
        //interval til at sætte tiden ind 
        this.interval
        //styles 
        this.div.style('font-size', '3rem')
        this.div.style('width', '16rem')
        this.div.style('height', '5rem')
        this.div.style('border', '4px dotted gray')
        this.div.style('display', 'grid')
        this.div.style('place-items', 'center')
        this.div.style('padding', '1rem')
        this.div.style('border-radius', '2rem')

        //reager på argrumentet style fra constructoren
        switch(this.style.shape){
            case 'circle':
                this.div.style('height', '16rem')
                this.div.style('border-radius', '50%')
                break
            case 'ellipse':
                this.div.style('height', '8rem')
                this.div.style('border-radius', '50%')
                break 
         }

        switch(this.style.background){
            case 'pink': 
                this.div.style('background', 'hotpink')
                break
            case 'black':
                this.div.style('background', 'black')
                this.div.style('color', 'white')
                break
         }
        
    }
    start(){
        this.interval = setInterval( ()=>{
            //den her komapkte linje kode, betyder at vi SPØRGER om hour() funktionen returnerer 
            //et tal UNDER ti - hvis ja, sætter vi et nul foran 
            this.hDiv.html( hour() < 10 ? '0' + hour() : hour() )
            this.mDiv.html( minute() < 10 ? '0' + minute() : minute() )
            this.sDiv.html( second() < 10 ? '0' + second() : second() )
        }, 1000)
    }
    stop(){
        clearInterval(this.interval)
    }
}