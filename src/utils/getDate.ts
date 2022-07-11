export const getDate = (timestamp: Date) => {
    let date = new Date(timestamp);
    return " " + date.getHours() +
        ":" + date.getMinutes()

}