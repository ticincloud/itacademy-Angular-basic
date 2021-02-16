
export class UserModel {

    email: string;
    password: string;
    nom?: string;

}

export class SociModel{
    id: number;
    num_soci: number;
    nom: string;
    dni: string;
    email: string;
    data_alta: string;
    data_baixa: string;
    data_neixement: string;

}

export class Session {
    token: string;
    user: UserModel;
}

