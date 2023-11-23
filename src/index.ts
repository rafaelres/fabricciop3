function boyer_moore(pattern: string, text: string):number[]{
    let diff = text.length - pattern.length;
    let char_map:any = this.build_char_map(pattern);
    let shifts:number[] = []
    let shift:number = 0; //pattern displacement
    while ( shift <= diff){
        let matched:boolean = true;
        let i = pattern.length-1;
        console.log("Position shift:....", shift);
        while(i>=0){
            if(pattern.charAt(i)!= text.charAt(i+shift)){ //char mismatch
                matched = false;
                break;
            }
            --i;
        }
        if(matched){
            shifts.push(shift)
            ++shift;
        } else {
            if(char_map[text.charAt(i+shift)]!= undefined){
                (i-char_map[text.charAt(i+shift)]>1)?
                    shift= shift+(i-char_map[text.charAt(i+shift)]):
                    ++shift;
            } else 
                shift += (i+1);                 
        }            
    }
    return shifts;        
} 