import messages_pt_BR from './message_pt_br';

const labelLang = {
    "pt-BR": messages_pt_BR
}

export const getMessagesByCurrentLanguage = () => {
    let lang = localStorage.getItem("language") ?? "pt-BR";
    return labelLang[lang];
};

export const getMessage = (id, args) => {
    const messages = getMessagesByCurrentLanguage();
    let message = messages[id];
    message = formatArgsMessage(message, args)
    if(message) return message;
    else return id
};


const formatArgsMessage = (message, args) => {
    if(Array.isArray(args) && args.length > 0){
        args.map((value, index) => {
            message = message.replace(`[${index}]`, value)
        })
    }
    return message
}
