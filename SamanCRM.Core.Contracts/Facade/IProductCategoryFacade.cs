using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IProductCategoryFacade
    {
        ProductCategoryDTO GetById(int id);
        IEnumerable<ProductCategoryDTO> GetAll();
        int Add(ProductCategoryDTO entity);
        void Remove(ProductCategoryDTO entity);
        void Update(ProductCategoryDTO entity);
    }
}
