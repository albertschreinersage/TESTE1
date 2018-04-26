//importamos tambem as namespaces para manipular as classes
using JqueryAjax.AspNetMVC.CRUD.Models.Model;
using JqueryAjax.AspNetMVC.CRUD.Models.Negocio;
using System;
using System.Web.Mvc;

namespace JqueryAjax.AspNetMVC.CRUD.Controllers
{
    public class AppController : Controller
    {
        //action padrao da AppController
        public ActionResult Index()
        {
            return View();
        }

        //Informamos no Atributo que será uma requisição do tipo Post

        [HttpPost]
        public void Cadastrar(PessoaModel pessoa)
        {
            try
            {
                new PessoaNeg().Cadastrar(pessoa);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public ActionResult Listar()
        {
            var listaPessoas = new PessoaNeg().Listar();
            return Json(listaPessoas, JsonRequestBehavior.AllowGet);
        }

        public void Deletar(int id)
        {
            try
            {
                new PessoaNeg().Deletar(id);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public ActionResult Editar(int id)
        {
            try
            {
                //recebemos o id da pessoa selecionada,
                //com este id, pedimos ao nosso banco fantasia,
                // que retorne a pessoa que possuir aquele id.
                var pessoa = new PessoaNeg().GetById(id);

                //para retornar ao ajax, temos que enviar nosso objeto em
                //formato JSON, e LIBERA-LO
                //Para a requisicao GET como dito anteriormente
                return Json(pessoa, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public void Atualizar(PessoaModel pessoa)
        {
            try
            {
                new PessoaNeg().Atualizar(pessoa);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}