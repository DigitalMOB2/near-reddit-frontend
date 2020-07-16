import HttpStatusCode from 'http-status-codes';

export function getErrorMsgByCode(code: string) {
    switch (code.toString()) {
        case HttpStatusCode.BAD_REQUEST.toString():
            return 'Username or password are wrong! Please try again!';
        case HttpStatusCode.INTERNAL_SERVER_ERROR.toString():
            return 'Internal server error. Please try again later!';
        default:
            return 'An error appeared on login. Please try again later!';
    }
}
