using System.Collections.Generic;
using System.Linq;

//importamos esta namespace para utilizar a classe PessoaModel
using JqueryAjax.AspNetMVC.CRUD.Models.Model;

namespace JqueryAjax.AspNetMVC.CRUD.Models.Repositorio
{
    public class PessoaRep
    {
        //como o foco nao é banco de dados, criamos uma lista estática
        private static List<PessoaModel> _listPessoas;

        //construtor da classe
        public PessoaRep()
        {
            //caso nossa lista nao for instanciada,
            //ele cria a nova instancia
            if (_listPessoas == null)
            {
                _listPessoas = new List<PessoaModel>();
            }
        }
        //retorna o objeto que possuir aquele Id expecífico.
        public PessoaModel GetById(int id)
        {
            return _listPessoas.SingleOrDefault(m => m.Id == id);
        }

        //Responsável pelo cadastro de novas pessoas.
        public void Cadastrar(PessoaModel pessoa)
        {
            //para o objeto static, fizemos esta logica
            //para a cada nova pessoa, adicionar um novo Id
            var id = 1;

            //vai incrementando a variavel até que nao existir um Id
            //com aquele valor
            while (_listPessoas.Any(x => x.Id == id))
                id++;

            //após encontrar um Id que não está sendo utilizado,
            //atribui à nossa nova pessoa
            pessoa.Id = id;

            //adiciona a pessoa no nosso banco fantasia
            _listPessoas.Add(pessoa);
        }

        //responsável por verificar uma pessoa existente
        //e atualizar os dados
        public void Atualizar(PessoaModel pessoa)
        {
            //pega em nosso banco fantasia aquela pessoa existente
            var pessoaDadoAnterior = GetById(pessoa.Id);
            if (pessoaDadoAnterior != null)
            {
                //usando reflection, pegamos todas as propriedades
                // daquela pessoa com exceção do Id
                //e adicionamos o novo valor do objeto
                foreach (var propertyInfo in typeof(PessoaModel)
                    .GetProperties().Where(x => x.Name != "Id"))
                {
                    //primeiro parâmetro é o objeto antigo
                    //segundo parametro é onde vai setar o novo valor
                    propertyInfo.SetValue(pessoaDadoAnterior, propertyInfo.GetValue(pessoa));
                }
            }
        }
        //responsável por remover um item
        public void Deletar(int id)
        {
            //Pega em nosso banco fantasia aquela pessoa
            var obj = GetById(id);

            //remove da lista estática(banco fantasia).
            _listPessoas.Remove(obj);
        }

        public IEnumerable<PessoaModel> Listar()
        {
            //retorna a lista somente leitura de pessoas
            return _listPessoas;
        }
    }
}