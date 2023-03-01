using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SamanCRM.Core.Contracts.Repository.Common;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SamanCRM.Infrastructure.Data.Common
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private DemoContext Context;
        public GenericRepository(DemoContext Context)
        {
            this.Context = Context;
        }
        public void Add(T entity)
        {
            Context.Set<T>().Add(entity); 
            Context.Entry(entity).State = EntityState.Added;
        }

        public IEnumerable<T> GetAll()
        {
            return Context.Set<T>().ToList();
        }

        public T GetById(int id)
        {
            return Context.Set<T>().Find(id);
        }

        public void Remove(T entity)
        {
            Context.Set<T>().Remove(entity);
            Context.Entry(entity).State = EntityState.Deleted;
        }
        public void RemoveRange(List<T> entity)
        {
            Context.Set<T>().RemoveRange(entity);
            foreach (var item in entity)
            {
                Context.Entry(item).State = EntityState.Deleted;
            }
        }
        public void UpdateRange(List<T> entity)
        {
            Context.Set<T>().UpdateRange(entity);
            foreach (var item in entity)
            {
                Context.Entry(item).State = EntityState.Modified;
            }
        }
        public void AddRange(List<T> entity)
        {
            Context.Set<T>().AddRange(entity);
            foreach (var item in entity)
            {
                Context.Entry(item).State = EntityState.Added;
            }
        }

        public void Update(T entity)
        {
            Context.Set<T>().Update(entity);
            Context.Entry(entity).State = EntityState.Modified;
        }
    }
}
