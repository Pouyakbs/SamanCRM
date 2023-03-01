using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.EF;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class PreInvoiceFacade : IPreInvoiceFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;
        private readonly DemoContext context;

        public PreInvoiceFacade(IUnitOfWork unitofWork, IMapper mapper, DemoContext context)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
            this.context = context;
        }
        public int Add(PreInvoiceDTO entity)
        {
            PreInvoice preInvoiceDTO = mapper.Map<PreInvoiceDTO, PreInvoice>(entity);
            List<PreInvoiceProducts> preInvoiceProducts = new List<PreInvoiceProducts>();
            // Add Product to Many To Many Table 
            foreach (var item in entity.ProductsID)
            {
                int productID = Int32.Parse(item);
                preInvoiceProducts.Add(new PreInvoiceProducts() { ProductsID = productID });
            }
            preInvoiceDTO.PreInvoiceProducts = preInvoiceProducts;
            unitofWork.PreInvoice.Add(preInvoiceDTO);
            unitofWork.Save();
            return preInvoiceDTO.PreInvoiceID;
        }

        public IEnumerable<PreInvoiceDTO> GetAll()
        {
            IEnumerable<PreInvoice> preInvoice = unitofWork.PreInvoice.GetAll();
            IEnumerable<PreInvoiceDTO> preInvoiceDTO = mapper.Map<IEnumerable<PreInvoice>, IEnumerable<PreInvoiceDTO>>(preInvoice);
            return preInvoiceDTO;
        }

        public PreInvoiceDTO GetById(int id)
        {
            PreInvoice preInvoice = unitofWork.PreInvoice.GetPreInvoiceByID(id).FirstOrDefault();
            List<string> prods = new List<string>();
            // Get Related Products From Many to Many Table
            foreach (var item in preInvoice.PreInvoiceProducts)
            {
                item.Products = unitofWork.Products.GetById(item.ProductsID);
                prods.Add(JsonSerializer.Serialize(item));
            }
            PreInvoiceDTO preInvoiceDTO = mapper.Map<PreInvoice, PreInvoiceDTO>(preInvoice);
            preInvoiceDTO.ProductsID = prods;
            return preInvoiceDTO;
        }

        public void Remove(PreInvoiceDTO entity)
        {
            PreInvoice preInvoiceDTO = mapper.Map<PreInvoiceDTO, PreInvoice>(entity);
            unitofWork.PreInvoice.Remove(preInvoiceDTO);
            unitofWork.Save();
        }

        public void Update(PreInvoiceDTO entity)
        {
            PreInvoice preInvoiceDTO = mapper.Map<PreInvoiceDTO, PreInvoice>(entity);
            PreInvoice preInvoice = unitofWork.PreInvoice.GetPreInvoiceByID(entity.PreInvoiceID).FirstOrDefault();
            // Delete Product From Many to Many Table
            foreach (var item in preInvoice.PreInvoiceProducts.ToList())
            {
                preInvoice.PreInvoiceProducts.Remove(item);
                context.Entry(item).State = EntityState.Deleted;
            }
            unitofWork.Save();
            List<PreInvoiceProducts> preInvoiceProducts = new List<PreInvoiceProducts>();
            // Add Product to Many to Many Table
            foreach (var item in entity.ProductsID)
            {
                int productID = Int32.Parse(item);
                preInvoiceProducts.Add(new PreInvoiceProducts() { ProductsID = productID });
            }
            preInvoiceDTO.PreInvoiceProducts = preInvoiceProducts;
            preInvoiceDTO.CreatedDate = preInvoice.CreatedDate;
            unitofWork.PreInvoice.Update(preInvoiceDTO);
            unitofWork.Save();
        }
    }
}
