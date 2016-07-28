export default function promiseMiddleware() {
    return next => action => {
      // Scompongo l'azione in tipo, promessa e resto
        const { promise, type, ...rest } = action;
      // Se l'azione non ha una chiave promessa continuo senza modifiche
        if (!promise) return next(action);

        const SUCCESS = type;
        const REQUEST = type + '_REQUEST';
        const FAILURE = type + '_FAILURE';
      // Altrimenti intercetto l'azione ed informo lo store che è in corso
      // una richiesta
        next({...rest, type: REQUEST});

        return promise
            .then(res => {
              // Quando la promessa è soddisfatta ritorno l'azione originale
              // aggiungendo la risposta alla chiave res
                next({...rest, res, type: SUCCESS});

                return true;
            })
            .catch(error => {
                next({...rest, error, type: FAILURE});
                console.log(error);
                return false;
            });
    };

}
