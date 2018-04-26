//importamos a namespace para usar a classe PessoaModel
using JqueryAjax.AspNetMVC.CRUD.Models.Model;

//importamos a namespace para usar nosso repositorio
using JqueryAjax.AspNetMVC.CRUD.Models.Repositorio;

using System.Collections.Generic;

namespace JqueryAjax.AspNetMVC.CRUD.Models.Negocio
{
    public class PessoaNeg
    {
        public void Cadastrar(PessoaModel pessoa)
        {
            new PessoaRep().Cadastrar(pessoa);
        }

        public void Atualizar(PessoaModel pessoa)
        {
            new PessoaRep().Atualizar(pessoa);
        }

        public void Deletar(int idPessoa)
        {
            new PessoaRep().Deletar(idPessoa);
        }

        public PessoaModel GetById(int id)
        {
            return new PessoaRep().GetById(id);
        }
        public IEnumerable<PessoaModel> Listar()
        {
            return new PessoaRep().Listar();
        }
    }
}