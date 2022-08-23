function updateHistory() {
    let all_entries = div_history_container.querySelectorAll("table.history_entry");
    let sample_entry = all_entries[all_entries.length-1];

    let until_index; // Marks until which index the list has to be gone through.
    if (all_entries.length === 1) { // if theres nothing except the sample
        until_index = config.history.length;
    }
    else {
        // Going through all history entries to see which is the last one
        // which is presented on the site. (to know which ones have to be added)
        for (let i=0;i<config.history.length;i++) {
            console.log(Number(all_entries[0].id), "===", Number(config.history[i][1]));
            if (Number(all_entries[0].id) === Number(config.history[i][1])) {
                until_index = i;
                break;
            }
        }
    }

    console.log("until_index=",until_index);

    for(let i=0;i<until_index;i++) {
        let config_entry = config.history[i];

        // Getting the HTML elements
        let new_entry = sample_entry.cloneNode(true);
        let text = new_entry.querySelector("tr>td.type_of_work_text");
        let duration = new_entry.querySelector("tr>td.type_of_work_duration");
        let buttons = new_entry.querySelectorAll("tr>td.history_entry_control>img");
        
        // Changing the default values
        new_entry.removeAttribute("hidden");
        new_entry.setAttribute("id", config_entry[1]);
        text.innerText = config_entry[0];
        duration.innerText = convertSecondsToTime(config_entry[2] - config_entry[1]);
        
        // Giving the buttons a function

        // Trash icon
        buttons[0].addEventListener("click", function() {
            // Erasing every memory to this entry
            div_history_container.removeChild(new_entry);
            config.history.pop(i);
            saveConfig();
        })

        // Copy up icon
        buttons[1].addEventListener("click", function() {
            // Changing the input fields value to this entrys value
            config.history[i][0] = input_work_type.value;
            text.innerText = input_work_type.value;
            saveConfig();
        })

        // Copy down icon
        buttons[2].addEventListener("click", function() {
            // Changing the input fields value to this entrys value
            input_work_type.value = config.history[i][0];
        })

        all_entries[0].before(new_entry);
    }



    
}