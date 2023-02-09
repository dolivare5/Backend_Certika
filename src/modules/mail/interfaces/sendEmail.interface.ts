export interface SendEmailInterface {
    mail: string;
    from_email: string;
    action: string;
    subject: string;
    template: string;
    name: string;
    code_auth?: string;
    method?: methods;
}

export enum methods {
    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete'
}
