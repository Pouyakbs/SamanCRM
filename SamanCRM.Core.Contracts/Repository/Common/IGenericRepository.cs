using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Contracts.Repository.Common
{
    public interface IGenericRepository<T> where T : class
    {
        T GetById(int id);
        IEnumerable<T> GetAll();
        void Add(T entity);
        void Remove(T entity);
        void RemoveRange(List<T> entity);
        void UpdateRange(List<T> entity);
        void AddRange(List<T> entity);
        void Update(T entity);
    }
}
