export type SecureInterface<T> = {

    Hash(Key): String;
    Encrypt(Data): T;
    Decrypt(Data): T;

}
