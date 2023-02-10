export interface SendEmailInterface {
    mail: string;
    from_email: string;
    action: string;
    subject: string;
    template: string;
    name: string;
    codigo_de_verificacion?: string;
    method?: methods;
}

export enum methods {
    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete',
    patch = 'patch'
}
