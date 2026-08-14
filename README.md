# Laser Oral Aid

PWA estática integrada ao Supabase para autenticação, perfis, acompanhamento e agenda.

## Executar localmente

Como o aplicativo usa módulos ES, ele deve ser servido por HTTP:

```bash
python3 -m http.server 4173
```

Depois, acesse `http://localhost:4173`.

## Supabase

- Projeto remoto: `bdgrkiffzhrfzmfflgmd`
- Cliente do navegador: `supabase-client.js`
- URL e chave publicável: `supabase-config.js`
- Histórico SQL: `supabase/migrations/`
- Tabelas: `profiles`, `patients`, `professionals`, `availabilities` e `appointments`
- Todas as tabelas possuem Row Level Security (RLS).
- Senhas são gerenciadas exclusivamente pelo Supabase Auth.

A chave de `supabase-config.js` é publicável e pode estar no navegador. Nunca coloque uma
chave secreta ou `service_role` no repositório.

## URLs de autenticação

No painel do Supabase, em **Authentication → URL Configuration**, configure:

- Site URL: `https://labodontodigitalufpb-png.github.io/laseroralia/`
- Redirect URLs:
  - `https://labodontodigitalufpb-png.github.io/laseroralia/**`
  - `http://localhost:4173/**`

Isso é necessário para confirmação de e-mail e recuperação de senha.

## Primeiro administrador

O cadastro público permite apenas os papéis `patient` e `professional`. Para evitar elevação
de privilégio, o primeiro administrador deve se cadastrar como paciente e ser promovido por
um responsável pelo banco:

```sql
begin;

update public.profiles
set role = 'admin'
where email = 'admin@exemplo.com';

delete from public.patients
where id = (select id from public.profiles where email = 'admin@exemplo.com');

commit;
```

Depois da promoção, o acesso é feito no formulário **Acesso admin** com o mesmo e-mail e senha.

## Dados locais anteriores

Versões antigas armazenavam cadastros e senhas no `localStorage`. O aplicativo novo não lê
nem envia esses registros automaticamente. Isso evita transmitir dados pessoais sem revisão.
Exporte ou remova os dados antigos de forma controlada antes de colocar a versão em produção.

## Exclusão de contas

A exclusão definitiva está desativada no cliente. Em um aplicativo com dados clínicos, ela deve
ser implementada junto com uma política formal de retenção, auditoria e anonimização; apagar
somente o perfil deixaria um usuário órfão no Supabase Auth.
