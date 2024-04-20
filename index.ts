#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todoList: string[] = [];
let condition = true;

console.log(chalk.bold.rgb(204,204,204)("\n \t\t <<<============================================>>>"));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<============>>> ${chalk.bold.cyanBright("Welcome to '\Code With Owais'\ - To-Do List App")} <<<============>>>`));
console.log(chalk.bold.rgb(204,204,204)("\t\t <<<============================================>>>\n"));

let main = async () => {
    while(condition) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.rgb(255,255,153)("Select an option You Want to do"),
                choices: ["Add Task", "Delete Task", "Update Task", "View To-Do List", "Exit"],

            }
        ]);

        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await updateTask();
        }
        else if (option.choice === "View To-Do List") {
            await viewTask();
        }
        else if (option.choice === "Exit") {
            condition = false;
        }
       
    };
};

// function to Add New task in Todo-List
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.rgb(255,255,153)("Enter Your New Task :"),
        }
    ]);

    todoList.push(newTask.task);
    console.log(`\n "${chalk.cyanBright.bold (newTask.task)}" Task added in To-Do List Successfully!\n`);
};


// function to delete a task from the list
let deleteTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.rgb(255,255,153)("Enter the 'index no.' of the task You Want to delete :"),
        }
    ]);

    let deletedTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(`\n "${chalk.cyanBright.bold (deletedTask)}" Task deleted from the To-Do List Successfully!\n`);
};

// function to View all Todo-List tasks
let viewTask = async () => {
    console.log("\n Your To-Do List : \n");
    todoList.forEach((task, index) => {
    const colordtask = chalk.bold.rgb(153,255,51)(task);
    console.log(`\t${index + 1}: ${colordtask}\n`);   
    });   
};

// function to update a task 
let updateTask = async () => {
    await viewTask();
    let update_task_index = await inquirer.prompt ([
        {
            name: "index",
            type: "number",
            message: chalk.rgb(255,255,153)("Enter the 'index no.' of the task You Want to Update :"),
        },
        {
            name: "new_task",
            type: "input",
            message: chalk.rgb(255,255,153)("Now Enter Your new task name :"),
        }
    ]);
    todoList[update_task_index.index - 1] = update_task_index.new_task
    console.log(`\n Task at index no. ${update_task_index.index} Updated Successfully [For Updated List check option "View To-Do List"]\n`);
   
}

main();


