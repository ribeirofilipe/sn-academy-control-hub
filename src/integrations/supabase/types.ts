export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      alunas_hotmart: {
        Row: {
          acesso_discord: boolean | null
          acesso_instagram: boolean | null
          atualizado_em: string | null
          criado_em: string | null
          curso: string
          data_compra: string
          data_expiracao: string | null
          discord_user_id: string | null
          email: string
          forma_pagamento: string
          id: string
          instagram_username: string | null
          nome: string
          observacoes_pagamento: string | null
          pagamento_manual: boolean | null
          parcelas_pagas: number | null
          parcelas_total: number | null
          proximo_vencimento: string | null
          status_acesso: string | null
          telefone: string | null
          transacao: string | null
          valor_parcela: number | null
          valor_liquido: number | null
          valor_bruto: number | null
          valor_pago: number | null
          data_garantia: string | null
          oferta: string | null
          origin: string | null
        }
        Insert: {
          acesso_discord?: boolean | null
          acesso_instagram?: boolean | null
          atualizado_em?: string | null
          criado_em?: string | null
          curso: string
          data_compra: string
          data_expiracao?: string | null
          discord_user_id?: string | null
          email: string
          forma_pagamento: string
          id?: string
          instagram_username?: string | null
          nome: string
          observacoes_pagamento?: string | null
          pagamento_manual?: boolean | null
          parcelas_pagas?: number | null
          parcelas_total?: number | null
          proximo_vencimento?: string | null
          status_acesso?: string | null
          telefone?: string | null
          transacao?: string | null
          valor_parcela?: number | null
          valor_liquido?: number | null
          valor_bruto?: number | null
          valor_pago?: number | null
          data_garantia?: string | null
          oferta?: string | null
          origin?: string | null
        }
        Update: {
          acesso_discord?: boolean | null
          acesso_instagram?: boolean | null
          atualizado_em?: string | null
          criado_em?: string | null
          curso?: string
          data_compra?: string
          data_expiracao?: string | null
          discord_user_id?: string | null
          email?: string
          forma_pagamento?: string
          id?: string
          instagram_username?: string | null
          nome?: string
          observacoes_pagamento?: string | null
          pagamento_manual?: boolean | null
          parcelas_pagas?: number | null
          parcelas_total?: number | null
          proximo_vencimento?: string | null
          status_acesso?: string | null
          telefone?: string | null
          transacao?: string | null
          valor_parcela?: number | null
          valor_liquido?: number | null
          valor_bruto?: number | null
          valor_pago?: number | null
          data_garantia?: string | null
          oferta?: string | null
          origin?: string | null
        }
        Relationships: []
      }
      aulas_vetorizadas: {
        Row: {
          content: string | null
          embedding: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      ecom_atributos: {
        Row: {
          created_at: string | null
          id: string
          nome_grupo: string
          nome_valor: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          nome_grupo: string
          nome_valor: string
        }
        Update: {
          created_at?: string | null
          id?: string
          nome_grupo?: string
          nome_valor?: string
        }
        Relationships: []
      }
      ecom_backups: {
        Row: {
          data_conclusao: string | null
          data_inicio: string | null
          id: string
          iniciado_por: string | null
          logs: string | null
          nome_arquivo: string
          status: string
          tamanho_bytes: number | null
          tipo: string
          url_armazenamento: string | null
        }
        Insert: {
          data_conclusao?: string | null
          data_inicio?: string | null
          id?: string
          iniciado_por?: string | null
          logs?: string | null
          nome_arquivo: string
          status: string
          tamanho_bytes?: number | null
          tipo: string
          url_armazenamento?: string | null
        }
        Update: {
          data_conclusao?: string | null
          data_inicio?: string | null
          id?: string
          iniciado_por?: string | null
          logs?: string | null
          nome_arquivo?: string
          status?: string
          tamanho_bytes?: number | null
          tipo?: string
          url_armazenamento?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "backups_iniciado_por_fkey"
            columns: ["iniciado_por"]
            isOneToOne: false
            referencedRelation: "sec_usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      ecom_categorias: {
        Row: {
          created_at: string | null
          id: string
          nome: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          nome: string
        }
        Update: {
          created_at?: string | null
          id?: string
          nome?: string
        }
        Relationships: []
      }
      ecom_clientes: {
        Row: {
          bairro: string | null
          cep: string | null
          cidade: string | null
          complemento: string | null
          dados_anonimizados: boolean | null
          data_aceite_politica: string | null
          data_casamento: string | null
          documento: string | null
          email: string | null
          endereco: string | null
          estado: string | null
          id: string
          motivo_anonimizacao: string | null
          nome_completo: string | null
          numero: string | null
          pais: string | null
          politica_aceita: boolean | null
          sec_usuario_id: string | null
          telefone: string | null
        }
        Insert: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          complemento?: string | null
          dados_anonimizados?: boolean | null
          data_aceite_politica?: string | null
          data_casamento?: string | null
          documento?: string | null
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          motivo_anonimizacao?: string | null
          nome_completo?: string | null
          numero?: string | null
          pais?: string | null
          politica_aceita?: boolean | null
          sec_usuario_id?: string | null
          telefone?: string | null
        }
        Update: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          complemento?: string | null
          dados_anonimizados?: boolean | null
          data_aceite_politica?: string | null
          data_casamento?: string | null
          documento?: string | null
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          motivo_anonimizacao?: string | null
          nome_completo?: string | null
          numero?: string | null
          pais?: string | null
          politica_aceita?: boolean | null
          sec_usuario_id?: string | null
          telefone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_sec_usuarios"
            columns: ["sec_usuario_id"]
            isOneToOne: false
            referencedRelation: "sec_usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      ecom_designs: {
        Row: {
          data_feedback: string | null
          data_upload: string | null
          feedback_cliente: string | null
          id: string
          pedido_id: string | null
          status_aprovacao: string | null
          versao: string | null
        }
        Insert: {
          data_feedback?: string | null
          data_upload?: string | null
          feedback_cliente?: string | null
          id?: string
          pedido_id?: string | null
          status_aprovacao?: string | null
          versao?: string | null
        }
        Update: {
          data_feedback?: string | null
          data_upload?: string | null
          feedback_cliente?: string | null
          id?: string
          pedido_id?: string | null
          status_aprovacao?: string | null
          versao?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "designs_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "ecom_pedidos"
            referencedColumns: ["id"]
          },
        ]
      }
      ecom_estoque: {
        Row: {
          atualizado_em: string | null
          categoria: string | null
          data_criacao: string | null
          fornecedor_id: string | null
          foto_item: string | null
          id: string
          localizacao_fisica: string | null
          nivel_minimo: number | null
          nome_material: string | null
          observacoes: string | null
          preco_medio: number | null
          quantidade_atual: number | null
          unidade_medida: string | null
        }
        Insert: {
          atualizado_em?: string | null
          categoria?: string | null
          data_criacao?: string | null
          fornecedor_id?: string | null
          foto_item?: string | null
          id?: string
          localizacao_fisica?: string | null
          nivel_minimo?: number | null
          nome_material?: string | null
          observacoes?: string | null
          preco_medio?: number | null
          quantidade_atual?: number | null
          unidade_medida?: string | null
        }
        Update: {
          atualizado_em?: string | null
          categoria?: string | null
          data_criacao?: string | null
          fornecedor_id?: string | null
          foto_item?: string | null
          id?: string
          localizacao_fisica?: string | null
          nivel_minimo?: number | null
          nome_material?: string | null
          observacoes?: string | null
          preco_medio?: number | null
          quantidade_atual?: number | null
          unidade_medida?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "estoque_fornecedor_id_fkey"
            columns: ["fornecedor_id"]
            isOneToOne: false
            referencedRelation: "ecom_fornecedores"
            referencedColumns: ["id"]
          },
        ]
      }
      ecom_faq_perguntas: {
        Row: {
          categoria: string | null
          id: number
          ordem: number | null
          pergunta: string
          resposta: string
        }
        Insert: {
          categoria?: string | null
          id?: number
          ordem?: number | null
          pergunta: string
          resposta: string
        }
        Update: {
          categoria?: string | null
          id?: number
          ordem?: number | null
          pergunta?: string
          resposta?: string
        }
        Relationships: []
      }
      ecom_faq_videos: {
        Row: {
          descricao_curta: string | null
          id: number
          ordem: number | null
          thumbnail_url: string | null
          titulo: string
          url_video: string
        }
        Insert: {
          descricao_curta?: string | null
          id?: number
          ordem?: number | null
          thumbnail_url?: string | null
          titulo: string
          url_video: string
        }
        Update: {
          descricao_curta?: string | null
          id?: number
          ordem?: number | null
          thumbnail_url?: string | null
          titulo?: string
          url_video?: string
        }
        Relationships: []
      }
      ecom_flores_pedido: {
        Row: {
          cor: string | null
          criado_em: string | null
          flor_nome: string
          id: string
          observacoes: string | null
          pedido_id: string | null
          quantidade: number | null
        }
        Insert: {
          cor?: string | null
          criado_em?: string | null
          flor_nome: string
          id?: string
          observacoes?: string | null
          pedido_id?: string | null
          quantidade?: number | null
        }
        Update: {
          cor?: string | null
          criado_em?: string | null
          flor_nome?: string
          id?: string
          observacoes?: string | null
          pedido_id?: string | null
          quantidade?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ecom_flores_pedido_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "ecom_pedidos"
            referencedColumns: ["id"]
          },
        ]
      }
      ecom_fornecedores: {
        Row: {
          atualizado_em: string | null
          avaliacao: number | null
          condicoes_pagamento: string | null
          contato_principal: string | null
          data_criacao: string | null
          email: string | null
          id: string
          nome_empresa: string | null
          prazo_medio_entrega: unknown | null
          produtos_fornecidos: string | null
          telefone: string | null
        }
        Insert: {
          atualizado_em?: string | null
          avaliacao?: number | null
          condicoes_pagamento?: string | null
          contato_principal?: string | null
          data_criacao?: string | null
          email?: string | null
          id?: string
          nome_empresa?: string | null
          prazo_medio_entrega?: unknown | null
          produtos_fornecidos?: string | null
          telefone?: string | null
        }
        Update: {
          atualizado_em?: string | null
          avaliacao?: number | null
          condicoes_pagamento?: string | null
          contato_principal?: string | null
          data_criacao?: string | null
          email?: string | null
          id?: string
          nome_empresa?: string | null
          prazo_medio_entrega?: unknown | null
          produtos_fornecidos?: string | null
          telefone?: string | null
        }
        Relationships: []
      }
      ecom_fotos_designs: {
        Row: {
          data_upload: string | null
          design_id: string | null
          id: string
          legenda: string | null
          url: string
        }
        Insert: {
          data_upload?: string | null
          design_id?: string | null
          id?: string
          legenda?: string | null
          url: string
        }
        Update: {
          data_upload?: string | null
          design_id?: string | null
          id?: string
          legenda?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "fotos_designs_design_id_fkey"
            columns: ["design_id"]
            isOneToOne: false
            referencedRelation: "ecom_designs"
            referencedColumns: ["id"]
          },
        ]
      }
      ecom_fotos_pedidos: {
        Row: {
          data_upload: string | null
          descricao: string | null
          design_approval_status: string | null
          id: string
          pedido_id: string | null
          thumbnail: boolean | null
          tipo: string | null
          url: string
        }
        Insert: {
          data_upload?: string | null
          descricao?: string | null
          design_approval_status?: string | null
          id?: string
          pedido_id?: string | null
          thumbnail?: boolean | null
          tipo?: string | null
          url: string
        }
        Update: {
          data_upload?: string | null
          descricao?: string | null
          design_approval_status?: string | null
          id?: string
          pedido_id?: string | null
          thumbnail?: boolean | null
          tipo?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "fotos_pedidos_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "ecom_pedidos"
            referencedColumns: ["id"]
          },
        ]
      }
      ecom_fotos_produtos: {
        Row: {
          data_upload: string | null
          descricao: string | null
          id: string
          produto_id: string | null
          thumbnail: boolean | null
          tipo: string | null
          url: string
        }
        Insert: {
          data_upload?: string | null
          descricao?: string | null
          id?: string
          produto_id?: string | null
          thumbnail?: boolean | null
          tipo?: string | null
          url: string
        }
        Update: {
          data_upload?: string | null
          descricao?: string | null
          id?: string
          produto_id?: string | null
          thumbnail?: boolean | null
          tipo?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_produto_id"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "ecom_produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      ecom_historico_etapas_pedido: {
        Row: {
          atualizado_em: string | null
          data_criacao: string | null
          data_hora_mudanca: string | null
          id: number
          observacoes: string | null
          pedido_id: string | null
          status_anterior: string | null
          status_novo: string | null
          tempo_no_status_anterior: unknown | null
          usuario_responsavel: string | null
        }
        Insert: {
          atualizado_em?: string | null
          data_criacao?: string | null
          data_hora_mudanca?: string | null
          id?: number
          observacoes?: string | null
          pedido_id?: string | null
          status_anterior?: string | null
          status_novo?: string | null
          tempo_no_status_anterior?: unknown | null
          usuario_responsavel?: string | null
        }
        Update: {
          atualizado_em?: string | null
          data_criacao?: string | null
          data_hora_mudanca?: string | null
          id?: number
          observacoes?: string | null
          pedido_id?: string | null
          status_anterior?: string | null
          status_novo?: string | null
          tempo_no_status_anterior?: unknown | null
          usuario_responsavel?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "historico_etapas_pedido_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "ecom_pedidos"
            referencedColumns: ["id"]
          },
        ]
      }
      ecom_ordem_servico: {
        Row: {
          atualizado_em: string
          criado_em: string
          criado_por: string | null
          data_criacao: string
          id: string
          numero_os: string
          observacoes_producao: string | null
          status: string
        }
        Insert: {
          atualizado_em?: string
          criado_em?: string
          criado_por?: string | null
          data_criacao?: string
          id?: string
          numero_os: string
          observacoes_producao?: string | null
          status?: string
        }
        Update: {
          atualizado_em?: string
          criado_em?: string
          criado_por?: string | null
          data_criacao?: string
          id?: string
          numero_os?: string
          observacoes_producao?: string | null
          status?: string
        }
        Relationships: []
      }
      ecom_ordem_servico_pedidos: {
        Row: {
          criado_em: string
          id: string
          observacoes_pedido: string | null
          ordem_servico_id: string
          pedido_id: string
        }
        Insert: {
          criado_em?: string
          id?: string
          observacoes_pedido?: string | null
          ordem_servico_id: string
          pedido_id: string
        }
        Update: {
          criado_em?: string
          id?: string
          observacoes_pedido?: string | null
          ordem_servico_id?: string
          pedido_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_ordem_servico"
            columns: ["ordem_servico_id"]
            isOneToOne: false
            referencedRelation: "ecom_ordem_servico"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_pedido"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "ecom_pedidos"
            referencedColumns: ["id"]
          },
        ]
      }
      ecom_pedidos: {
        Row: {
          atualizado_em: string | null
          cliente_id: string | null
          code: string | null
          codigo_rastreamento: string | null
          data_criacao: string | null
          data_inicio_desidratacao: string | null
          data_pedido: string | null
          data_recebimento_buque: string | null
          data_retirada: string | null
          desconto: number | null
          estado_buque: string | null
          id: string
          metodo_envio: string | null
          nome_vendedor: string | null
          observacoes: string | null
          peso: number | null
          plataforma: string | null
          previsao_entrega: string | null
          retirada_status: string | null
          silica_uso: string | null
          status_id: string | null
          status_pagamento: string | null
          tamanho_caixa: string | null
          tipo_secagem: string | null
          trello_card_id: string | null
          valor_frete: number | null
          valor_total: number | null
        }
        Insert: {
          atualizado_em?: string | null
          cliente_id?: string | null
          code?: string | null
          codigo_rastreamento?: string | null
          data_criacao?: string | null
          data_inicio_desidratacao?: string | null
          data_pedido?: string | null
          data_recebimento_buque?: string | null
          data_retirada?: string | null
          desconto?: number | null
          estado_buque?: string | null
          id?: string
          metodo_envio?: string | null
          nome_vendedor?: string | null
          observacoes?: string | null
          peso?: number | null
          plataforma?: string | null
          previsao_entrega?: string | null
          retirada_status?: string | null
          silica_uso?: string | null
          status_id?: string | null
          status_pagamento?: string | null
          tamanho_caixa?: string | null
          tipo_secagem?: string | null
          trello_card_id?: string | null
          valor_frete?: number | null
          valor_total?: number | null
        }
        Update: {
          atualizado_em?: string | null
          cliente_id?: string | null
          code?: string | null
          codigo_rastreamento?: string | null
          data_criacao?: string | null
          data_inicio_desidratacao?: string | null
          data_pedido?: string | null
          data_recebimento_buque?: string | null
          data_retirada?: string | null
          desconto?: number | null
          estado_buque?: string | null
          id?: string
          metodo_envio?: string | null
          nome_vendedor?: string | null
          observacoes?: string | null
          peso?: number | null
          plataforma?: string | null
          previsao_entrega?: string | null
          retirada_status?: string | null
          silica_uso?: string | null
          status_id?: string | null
          status_pagamento?: string | null
          tamanho_caixa?: string | null
          tipo_secagem?: string | null
          trello_card_id?: string | null
          valor_frete?: number | null
          valor_total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_ecom_pedidos_status_id"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "ecom_pedidos_statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "ecom_clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      ecom_pedidos_produtos: {
        Row: {
          criado_em: string | null
          id: string
          nome_produto: string
          observacao: string | null
          pedido_id: string
          personalizacao: string | null
          preco_total: number | null
          preco_unitario: number
          presente: boolean | null
          quantidade: number
          variacao: string | null
        }
        Insert: {
          criado_em?: string | null
          id?: string
          nome_produto: string
          observacao?: string | null
          pedido_id: string
          personalizacao?: string | null
          preco_total?: number | null
          preco_unitario: number
          presente?: boolean | null
          quantidade?: number
          variacao?: string | null
        }
        Update: {
          criado_em?: string | null
          id?: string
          nome_produto?: string
          observacao?: string | null
          pedido_id?: string
          personalizacao?: string | null
          preco_total?: number | null
          preco_unitario?: number
          presente?: boolean | null
          quantidade?: number
          variacao?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ecom_pedidos_produtos_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "ecom_pedidos"
            referencedColumns: ["id"]
          },
        ]
      }
      ecom_pedidos_statuses: {
        Row: {
          ativo: boolean | null
          atualizado_em: string | null
          cor: string | null
          criado_em: string | null
          id: string
          nome: string
          ordem_exibicao: number | null
        }
        Insert: {
          ativo?: boolean | null
          atualizado_em?: string | null
          cor?: string | null
          criado_em?: string | null
          id?: string
          nome: string
          ordem_exibicao?: number | null
        }
        Update: {
          ativo?: boolean | null
          atualizado_em?: string | null
          cor?: string | null
          criado_em?: string | null
          id?: string
          nome?: string
          ordem_exibicao?: number | null
        }
        Relationships: []
      }
      ecom_pedidos_tags: {
        Row: {
          atualizado_em: string | null
          cor: string | null
          criado_em: string | null
          id: string
          nome: string
        }
        Insert: {
          atualizado_em?: string | null
          cor?: string | null
          criado_em?: string | null
          id?: string
          nome: string
        }
        Update: {
          atualizado_em?: string | null
          cor?: string | null
          criado_em?: string | null
          id?: string
          nome?: string
        }
        Relationships: []
      }
      ecom_pedidos_tags_pedidos: {
        Row: {
          criado_em: string | null
          pedido_id: string
          tag_id: string
        }
        Insert: {
          criado_em?: string | null
          pedido_id: string
          tag_id: string
        }
        Update: {
          criado_em?: string | null
          pedido_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_ecom_pedidos_tags_pedidos_pedido_id"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "ecom_pedidos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_ecom_pedidos_tags_pedidos_tag_id"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "ecom_pedidos_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      ecom_ponto_registros: {
        Row: {
          created_at: string
          criado_por: string | null
          data_registro: string
          editado_por: string | null
          horario: string
          id: string
          observacoes: string | null
          tipo_marcacao: string
          updated_at: string
          usuario_id: string
        }
        Insert: {
          created_at?: string
          criado_por?: string | null
          data_registro: string
          editado_por?: string | null
          horario: string
          id?: string
          observacoes?: string | null
          tipo_marcacao: string
          updated_at?: string
          usuario_id: string
        }
        Update: {
          created_at?: string
          criado_por?: string | null
          data_registro?: string
          editado_por?: string | null
          horario?: string
          id?: string
          observacoes?: string | null
          tipo_marcacao?: string
          updated_at?: string
          usuario_id?: string
        }
        Relationships: []
      }
      ecom_producao: {
        Row: {
          checklist_qualidade: Json | null
          data_inicio_etapa: string | null
          etapa_atual: string | null
          fotos_processo: string[] | null
          id: string
          materiais_utilizados: Json | null
          observacoes_producao: string | null
          pedido_id: string | null
          previsao_conclusao_etapa: string | null
        }
        Insert: {
          checklist_qualidade?: Json | null
          data_inicio_etapa?: string | null
          etapa_atual?: string | null
          fotos_processo?: string[] | null
          id?: string
          materiais_utilizados?: Json | null
          observacoes_producao?: string | null
          pedido_id?: string | null
          previsao_conclusao_etapa?: string | null
        }
        Update: {
          checklist_qualidade?: Json | null
          data_inicio_etapa?: string | null
          etapa_atual?: string | null
          fotos_processo?: string[] | null
          id?: string
          materiais_utilizados?: Json | null
          observacoes_producao?: string | null
          pedido_id?: string | null
          previsao_conclusao_etapa?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "producao_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "ecom_pedidos"
            referencedColumns: ["id"]
          },
        ]
      }
      ecom_produto_atributos: {
        Row: {
          atributo_id: string
          produto_id: string
        }
        Insert: {
          atributo_id: string
          produto_id: string
        }
        Update: {
          atributo_id?: string
          produto_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ecom_produto_atributos_atributo_id_fkey"
            columns: ["atributo_id"]
            isOneToOne: false
            referencedRelation: "ecom_atributos"
            referencedColumns: ["id"]
          },
        ]
      }
      ecom_produtos: {
        Row: {
          altura: number | null
          ativo: boolean | null
          categoria_id: string | null
          created_at: string | null
          descricao: string | null
          estoque: number | null
          external_id: string | null
          id: string
          largura: number | null
          ncm: string | null
          nome: string
          peso: number | null
          preco: number | null
          profundidade: number | null
          proposito_id: string | null
          slug: string | null
          tipo_id: string | null
          updated_at: string | null
        }
        Insert: {
          altura?: number | null
          ativo?: boolean | null
          categoria_id?: string | null
          created_at?: string | null
          descricao?: string | null
          estoque?: number | null
          external_id?: string | null
          id?: string
          largura?: number | null
          ncm?: string | null
          nome: string
          peso?: number | null
          preco?: number | null
          profundidade?: number | null
          proposito_id?: string | null
          slug?: string | null
          tipo_id?: string | null
          updated_at?: string | null
        }
        Update: {
          altura?: number | null
          ativo?: boolean | null
          categoria_id?: string | null
          created_at?: string | null
          descricao?: string | null
          estoque?: number | null
          external_id?: string | null
          id?: string
          largura?: number | null
          ncm?: string | null
          nome?: string
          peso?: number | null
          preco?: number | null
          profundidade?: number | null
          proposito_id?: string | null
          slug?: string | null
          tipo_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ecom_produtos_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "ecom_categorias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecom_produtos_proposito_id_fkey"
            columns: ["proposito_id"]
            isOneToOne: false
            referencedRelation: "ecom_propositos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecom_produtos_tipo_id_fkey"
            columns: ["tipo_id"]
            isOneToOne: false
            referencedRelation: "ecom_tipos"
            referencedColumns: ["id"]
          },
        ]
      }
      ecom_propositos: {
        Row: {
          created_at: string | null
          id: string
          nome: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          nome: string
        }
        Update: {
          created_at?: string | null
          id?: string
          nome?: string
        }
        Relationships: []
      }
      ecom_relatorios_leads_diarios: {
        Row: {
          conversas_convertidas: number
          created_at: string
          criado_por: string
          data_relatorio: string
          follow_ups_convertidos: number
          follow_ups_feitos: number
          id: string
          observacoes: string | null
          total_conversas_instagram: number
          total_conversas_whatsapp: number
          total_follow_up_instagram: number
          total_novas_conversas: number
          updated_at: string
        }
        Insert: {
          conversas_convertidas?: number
          created_at?: string
          criado_por: string
          data_relatorio: string
          follow_ups_convertidos?: number
          follow_ups_feitos?: number
          id?: string
          observacoes?: string | null
          total_conversas_instagram?: number
          total_conversas_whatsapp?: number
          total_follow_up_instagram?: number
          total_novas_conversas?: number
          updated_at?: string
        }
        Update: {
          conversas_convertidas?: number
          created_at?: string
          criado_por?: string
          data_relatorio?: string
          follow_ups_convertidos?: number
          follow_ups_feitos?: number
          id?: string
          observacoes?: string | null
          total_conversas_instagram?: number
          total_conversas_whatsapp?: number
          total_follow_up_instagram?: number
          total_novas_conversas?: number
          updated_at?: string
        }
        Relationships: []
      }
      ecom_sugestoes: {
        Row: {
          created_at: string
          descricao: string
          id: string
          prints: string[] | null
          status: string
          tipo: string
          titulo: string
          updated_at: string
          usuario_id: string
        }
        Insert: {
          created_at?: string
          descricao: string
          id?: string
          prints?: string[] | null
          status?: string
          tipo: string
          titulo: string
          updated_at?: string
          usuario_id: string
        }
        Update: {
          created_at?: string
          descricao?: string
          id?: string
          prints?: string[] | null
          status?: string
          tipo?: string
          titulo?: string
          updated_at?: string
          usuario_id?: string
        }
        Relationships: []
      }
      ecom_tipos: {
        Row: {
          created_at: string | null
          id: string
          nome: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          nome: string
        }
        Update: {
          created_at?: string | null
          id?: string
          nome?: string
        }
        Relationships: []
      }
      epoxi_calculations: {
        Row: {
          created_at: string | null
          data: Json
          id: string
          nome: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          data: Json
          id?: string
          nome?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json
          id?: string
          nome?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "epoxi_calculations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "epoxi_users"
            referencedColumns: ["id"]
          },
        ]
      }
      epoxi_materials: {
        Row: {
          description: string | null
          id: string
          recommended_for: string[] | null
          title: string
          type: string
          url: string
        }
        Insert: {
          description?: string | null
          id?: string
          recommended_for?: string[] | null
          title: string
          type: string
          url: string
        }
        Update: {
          description?: string | null
          id?: string
          recommended_for?: string[] | null
          title?: string
          type?: string
          url?: string
        }
        Relationships: []
      }
      epoxi_moldes: {
        Row: {
          ativo: boolean | null
          categoria: string
          created_at: string | null
          descricao: string | null
          dificuldade: string | null
          dimensoes: Json
          formato: string | null
          id: string
          imagem: string | null
          nome: string
          volume: number
        }
        Insert: {
          ativo?: boolean | null
          categoria: string
          created_at?: string | null
          descricao?: string | null
          dificuldade?: string | null
          dimensoes: Json
          formato?: string | null
          id?: string
          imagem?: string | null
          nome: string
          volume: number
        }
        Update: {
          ativo?: boolean | null
          categoria?: string
          created_at?: string | null
          descricao?: string | null
          dificuldade?: string | null
          dimensoes?: Json
          formato?: string | null
          id?: string
          imagem?: string | null
          nome?: string
          volume?: number
        }
        Relationships: []
      }
      epoxi_precificacoes: {
        Row: {
          created_at: string | null
          custo_catalisador: number
          custo_mao_obra: number | null
          custo_materiais: number | null
          custo_resina: number
          dimensoes: Json
          formato: string
          id: string
          margem_lucro: number | null
          nome: string
          observacoes: string | null
          preco_final: number
          updated_at: string | null
          user_id: string
          volume: number
        }
        Insert: {
          created_at?: string | null
          custo_catalisador: number
          custo_mao_obra?: number | null
          custo_materiais?: number | null
          custo_resina: number
          dimensoes: Json
          formato: string
          id?: string
          margem_lucro?: number | null
          nome: string
          observacoes?: string | null
          preco_final: number
          updated_at?: string | null
          user_id: string
          volume: number
        }
        Update: {
          created_at?: string | null
          custo_catalisador?: number
          custo_mao_obra?: number | null
          custo_materiais?: number | null
          custo_resina?: number
          dimensoes?: Json
          formato?: string
          id?: string
          margem_lucro?: number | null
          nome?: string
          observacoes?: string | null
          preco_final?: number
          updated_at?: string | null
          user_id?: string
          volume?: number
        }
        Relationships: []
      }
      epoxi_user_materials: {
        Row: {
          accessed_at: string | null
          id: string
          material_id: string | null
          user_id: string | null
        }
        Insert: {
          accessed_at?: string | null
          id?: string
          material_id?: string | null
          user_id?: string | null
        }
        Update: {
          accessed_at?: string | null
          id?: string
          material_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "epoxi_user_materials_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "epoxi_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "epoxi_user_materials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "epoxi_users"
            referencedColumns: ["id"]
          },
        ]
      }
      epoxi_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string | null
          phone: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name?: string | null
          phone?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      instagram_requests: {
        Row: {
          aluna_id: string | null
          course: string | null
          created_at: string
          id: string
          instagram_handle: string
          instagram_url: string | null
          message: string | null
          request_date: string
          status: string
          student_email: string
          student_name: string
          updated_at: string
        }
        Insert: {
          aluna_id?: string | null
          course?: string | null
          created_at?: string
          id?: string
          instagram_handle: string
          instagram_url?: string | null
          message?: string | null
          request_date?: string
          status?: string
          student_email: string
          student_name: string
          updated_at?: string
        }
        Update: {
          aluna_id?: string | null
          course?: string | null
          created_at?: string
          id?: string
          instagram_handle?: string
          instagram_url?: string | null
          message?: string | null
          request_date?: string
          status?: string
          student_email?: string
          student_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "instagram_requests_aluna_id_fkey"
            columns: ["aluna_id"]
            isOneToOne: false
            referencedRelation: "alunas_hotmart"
            referencedColumns: ["id"]
          },
        ]
      }
      leads_form: {
        Row: {
          additional_info: string | null
          city: string | null
          created_at: string | null
          email: string
          flower_status: string | null
          id: number
          inspiration: string | null
          name: string
          occasion: string | null
          phone: string | null
          piece_type: string | null
          referral_source: string | null
          status: string | null
          uf: string | null
          updated_at: string | null
          wedding_date: string | null
          wish_date: string | null
        }
        Insert: {
          additional_info?: string | null
          city?: string | null
          created_at?: string | null
          email: string
          flower_status?: string | null
          id?: number
          inspiration?: string | null
          name: string
          occasion?: string | null
          phone?: string | null
          piece_type?: string | null
          referral_source?: string | null
          status?: string | null
          uf?: string | null
          updated_at?: string | null
          wedding_date?: string | null
          wish_date?: string | null
        }
        Update: {
          additional_info?: string | null
          city?: string | null
          created_at?: string | null
          email?: string
          flower_status?: string | null
          id?: number
          inspiration?: string | null
          name?: string
          occasion?: string | null
          phone?: string | null
          piece_type?: string | null
          referral_source?: string | null
          status?: string | null
          uf?: string | null
          updated_at?: string | null
          wedding_date?: string | null
          wish_date?: string | null
        }
        Relationships: []
      }
      meta_ads: {
        Row: {
          actions: Json | null
          campaign_id: string
          campaign_name: string | null
          clicks: number | null
          cpc: number | null
          cpm: number | null
          data: string
          id: number
          impressions: number | null
          inserido_em: string | null
          purchase_roas: number | null
          reach: number | null
          spend: number | null
        }
        Insert: {
          actions?: Json | null
          campaign_id: string
          campaign_name?: string | null
          clicks?: number | null
          cpc?: number | null
          cpm?: number | null
          data: string
          id?: number
          impressions?: number | null
          inserido_em?: string | null
          purchase_roas?: number | null
          reach?: number | null
          spend?: number | null
        }
        Update: {
          actions?: Json | null
          campaign_id?: string
          campaign_name?: string | null
          clicks?: number | null
          cpc?: number | null
          cpm?: number | null
          data?: string
          id?: number
          impressions?: number | null
          inserido_em?: string | null
          purchase_roas?: number | null
          reach?: number | null
          spend?: number | null
        }
        Relationships: []
      }
      nextlevel_exercises: {
        Row: {
          category: string
          created_at: string | null
          equipment_type: string | null
          id: string
          image_url: string | null
          instructions: string[] | null
          muscle_groups: string[]
          name: string
          tips: string[] | null
          video_url: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          equipment_type?: string | null
          id?: string
          image_url?: string | null
          instructions?: string[] | null
          muscle_groups: string[]
          name: string
          tips?: string[] | null
          video_url?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          equipment_type?: string | null
          id?: string
          image_url?: string | null
          instructions?: string[] | null
          muscle_groups?: string[]
          name?: string
          tips?: string[] | null
          video_url?: string | null
        }
        Relationships: []
      }
      nextlevel_template_exercises: {
        Row: {
          description: string | null
          exercise_id: string
          id: string
          order_index: number
          reps: string
          rest_time: number | null
          sets: number
          suggested_weight: number | null
          template_id: string
        }
        Insert: {
          description?: string | null
          exercise_id: string
          id?: string
          order_index: number
          reps: string
          rest_time?: number | null
          sets: number
          suggested_weight?: number | null
          template_id: string
        }
        Update: {
          description?: string | null
          exercise_id?: string
          id?: string
          order_index?: number
          reps?: string
          rest_time?: number | null
          sets?: number
          suggested_weight?: number | null
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nextlevel_template_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "nextlevel_exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nextlevel_template_exercises_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "nextlevel_workout_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      nextlevel_users: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          subscription_type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          subscription_type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          subscription_type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      nextlevel_workout_exercises: {
        Row: {
          exercise_id: string
          id: string
          order_index: number
          workout_id: string
        }
        Insert: {
          exercise_id: string
          id?: string
          order_index: number
          workout_id: string
        }
        Update: {
          exercise_id?: string
          id?: string
          order_index?: number
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nextlevel_workout_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "nextlevel_exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nextlevel_workout_exercises_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "nextlevel_workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      nextlevel_workout_sets: {
        Row: {
          completed: boolean | null
          created_at: string | null
          id: string
          reps: number
          rpe: number | null
          set_number: number
          weight: number
          workout_exercise_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          reps: number
          rpe?: number | null
          set_number: number
          weight: number
          workout_exercise_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          reps?: number
          rpe?: number | null
          set_number?: number
          weight?: number
          workout_exercise_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nextlevel_workout_sets_workout_exercise_id_fkey"
            columns: ["workout_exercise_id"]
            isOneToOne: false
            referencedRelation: "nextlevel_workout_exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      nextlevel_workout_templates: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nextlevel_workout_templates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "nextlevel_users"
            referencedColumns: ["id"]
          },
        ]
      }
      nextlevel_workouts: {
        Row: {
          completed: boolean | null
          created_at: string | null
          date: string
          duration: number | null
          id: string
          notes: string | null
          template_id: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          date?: string
          duration?: number | null
          id?: string
          notes?: string | null
          template_id?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          date?: string
          duration?: number | null
          id?: string
          notes?: string | null
          template_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nextlevel_workouts_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "nextlevel_workout_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nextlevel_workouts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "nextlevel_users"
            referencedColumns: ["id"]
          },
        ]
      }
      orbit_account_balance: {
        Row: {
          banco: string
          created_at: string
          id: string
          nome_conta: string
          saldo: number
          tipo_conta: string
          updated_at: string
          user_id: string
        }
        Insert: {
          banco: string
          created_at?: string
          id?: string
          nome_conta: string
          saldo?: number
          tipo_conta?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          banco?: string
          created_at?: string
          id?: string
          nome_conta?: string
          saldo?: number
          tipo_conta?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      orbit_cards: {
        Row: {
          bandeira: string
          created_at: string
          cvv: string
          data_vencimento: string
          id: string
          nome_cartao: string
          numero_cartao: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bandeira: string
          created_at?: string
          cvv: string
          data_vencimento: string
          id?: string
          nome_cartao: string
          numero_cartao: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bandeira?: string
          created_at?: string
          cvv?: string
          data_vencimento?: string
          id?: string
          nome_cartao?: string
          numero_cartao?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      orbit_despesas: {
        Row: {
          categoria: string
          created_at: string
          data_vencimento: string
          descricao: string
          id: string
          recorrencia: string
          recorrente_id: string | null
          status: string
          tipo: string
          updated_at: string
          user_id: string
          valor: number
        }
        Insert: {
          categoria: string
          created_at?: string
          data_vencimento: string
          descricao: string
          id?: string
          recorrencia?: string
          recorrente_id?: string | null
          status?: string
          tipo: string
          updated_at?: string
          user_id: string
          valor: number
        }
        Update: {
          categoria?: string
          created_at?: string
          data_vencimento?: string
          descricao?: string
          id?: string
          recorrencia?: string
          recorrente_id?: string | null
          status?: string
          tipo?: string
          updated_at?: string
          user_id?: string
          valor?: number
        }
        Relationships: []
      }
      orbit_metas: {
        Row: {
          ano: number
          categoria: string
          created_at: string
          id: string
          mes: number
          tipo: string
          updated_at: string
          user_id: string
          valor_limite: number
        }
        Insert: {
          ano: number
          categoria: string
          created_at?: string
          id?: string
          mes: number
          tipo: string
          updated_at?: string
          user_id: string
          valor_limite: number
        }
        Update: {
          ano?: number
          categoria?: string
          created_at?: string
          id?: string
          mes?: number
          tipo?: string
          updated_at?: string
          user_id?: string
          valor_limite?: number
        }
        Relationships: []
      }
      orbit_profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          nome: string | null
          tipo: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          nome?: string | null
          tipo?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          nome?: string | null
          tipo?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      orbit_receitas: {
        Row: {
          atualizado_em: string
          conta_id: string | null
          criado_em: string
          data_recebimento: string
          fonte: string
          id: string
          observacoes: string | null
          recebido: boolean | null
          tipo_conta: string
          usuario_id: string
          valor: number
        }
        Insert: {
          atualizado_em?: string
          conta_id?: string | null
          criado_em?: string
          data_recebimento: string
          fonte: string
          id?: string
          observacoes?: string | null
          recebido?: boolean | null
          tipo_conta: string
          usuario_id: string
          valor: number
        }
        Update: {
          atualizado_em?: string
          conta_id?: string | null
          criado_em?: string
          data_recebimento?: string
          fonte?: string
          id?: string
          observacoes?: string | null
          recebido?: boolean | null
          tipo_conta?: string
          usuario_id?: string
          valor?: number
        }
        Relationships: []
      }
      pagamentos_manuais: {
        Row: {
          aluna_id: string
          created_at: string | null
          data_notificacao: string | null
          data_pagamento: string | null
          data_vencimento: string
          forma_pagamento: string | null
          id: string
          notificacao_enviada: boolean | null
          numero_parcela: number
          observacoes: string | null
          status: string
          updated_at: string | null
          valor_parcela: number
        }
        Insert: {
          aluna_id: string
          created_at?: string | null
          data_notificacao?: string | null
          data_pagamento?: string | null
          data_vencimento: string
          forma_pagamento?: string | null
          id?: string
          notificacao_enviada?: boolean | null
          numero_parcela: number
          observacoes?: string | null
          status?: string
          updated_at?: string | null
          valor_parcela: number
        }
        Update: {
          aluna_id?: string
          created_at?: string | null
          data_notificacao?: string | null
          data_pagamento?: string | null
          data_vencimento?: string
          forma_pagamento?: string | null
          id?: string
          notificacao_enviada?: boolean | null
          numero_parcela?: number
          observacoes?: string | null
          status?: string
          updated_at?: string | null
          valor_parcela?: number
        }
        Relationships: [
          {
            foreignKeyName: "pagamentos_manuais_aluna_id_fkey"
            columns: ["aluna_id"]
            isOneToOne: false
            referencedRelation: "alunas_hotmart"
            referencedColumns: ["id"]
          },
        ]
      }
      process_docs_vectorized: {
        Row: {
          content: string
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Update: {
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      processos_eternizacao: {
        Row: {
          content: string
          embedding: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          content: string
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Update: {
          content?: string
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      sec_configuracoes: {
        Row: {
          categoria: string
          chave: string
          created_at: string | null
          descricao: string | null
          id: string
          tipo: string
          updated_at: string | null
          valor: string
        }
        Insert: {
          categoria: string
          chave: string
          created_at?: string | null
          descricao?: string | null
          id?: string
          tipo: string
          updated_at?: string | null
          valor: string
        }
        Update: {
          categoria?: string
          chave?: string
          created_at?: string | null
          descricao?: string | null
          id?: string
          tipo?: string
          updated_at?: string | null
          valor?: string
        }
        Relationships: []
      }
      sec_consentimentos: {
        Row: {
          cliente_id: string
          consentiu: boolean
          data_consentimento: string | null
          data_revogacao: string | null
          id: string
          ip_origem: string | null
          tipo: string
          user_agent: string | null
          versao_politica: string | null
        }
        Insert: {
          cliente_id: string
          consentiu: boolean
          data_consentimento?: string | null
          data_revogacao?: string | null
          id?: string
          ip_origem?: string | null
          tipo: string
          user_agent?: string | null
          versao_politica?: string | null
        }
        Update: {
          cliente_id?: string
          consentiu?: boolean
          data_consentimento?: string | null
          data_revogacao?: string | null
          id?: string
          ip_origem?: string | null
          tipo?: string
          user_agent?: string | null
          versao_politica?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consentimentos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "ecom_clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      sec_logs_acesso: {
        Row: {
          cliente_id: string | null
          detalhes: string | null
          id: string
          ip_origem: string | null
          sucesso: boolean | null
          timestamp: string | null
          tipo_evento: string
          user_agent: string | null
          usuario_id: string | null
        }
        Insert: {
          cliente_id?: string | null
          detalhes?: string | null
          id?: string
          ip_origem?: string | null
          sucesso?: boolean | null
          timestamp?: string | null
          tipo_evento: string
          user_agent?: string | null
          usuario_id?: string | null
        }
        Update: {
          cliente_id?: string | null
          detalhes?: string | null
          id?: string
          ip_origem?: string | null
          sucesso?: boolean | null
          timestamp?: string | null
          tipo_evento?: string
          user_agent?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logs_acesso_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "ecom_clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "logs_acesso_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "sec_usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      sec_logs_atividades: {
        Row: {
          acao: string
          cliente_id: string | null
          dados_antigos: Json | null
          dados_novos: Json | null
          descricao: string | null
          entidade_id: string | null
          entidade_tipo: string | null
          id: string
          ip_origem: string | null
          modulo: string
          timestamp: string | null
          user_agent: string | null
          usuario_id: string | null
        }
        Insert: {
          acao: string
          cliente_id?: string | null
          dados_antigos?: Json | null
          dados_novos?: Json | null
          descricao?: string | null
          entidade_id?: string | null
          entidade_tipo?: string | null
          id?: string
          ip_origem?: string | null
          modulo: string
          timestamp?: string | null
          user_agent?: string | null
          usuario_id?: string | null
        }
        Update: {
          acao?: string
          cliente_id?: string | null
          dados_antigos?: Json | null
          dados_novos?: Json | null
          descricao?: string | null
          entidade_id?: string | null
          entidade_tipo?: string | null
          id?: string
          ip_origem?: string | null
          modulo?: string
          timestamp?: string | null
          user_agent?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logs_atividades_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "ecom_clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "logs_atividades_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "sec_usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      sec_modulos: {
        Row: {
          ativo: boolean | null
          chave: string
          created_at: string | null
          descricao: string | null
          icone: string | null
          id: string
          nome: string
          ordem: number | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          chave: string
          created_at?: string | null
          descricao?: string | null
          icone?: string | null
          id?: string
          nome: string
          ordem?: number | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          chave?: string
          created_at?: string | null
          descricao?: string | null
          icone?: string | null
          id?: string
          nome?: string
          ordem?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sec_perfis: {
        Row: {
          created_at: string | null
          descricao: string | null
          id: string
          nivel_acesso: number
          nome: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          descricao?: string | null
          id?: string
          nivel_acesso: number
          nome: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          descricao?: string | null
          id?: string
          nivel_acesso?: number
          nome?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      sec_permissoes: {
        Row: {
          created_at: string | null
          id: string
          modulo_id: string
          perfil_id: string
          pode_aprovar: boolean | null
          pode_criar: boolean | null
          pode_editar: boolean | null
          pode_excluir: boolean | null
          pode_exportar: boolean | null
          pode_visualizar: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          modulo_id: string
          perfil_id: string
          pode_aprovar?: boolean | null
          pode_criar?: boolean | null
          pode_editar?: boolean | null
          pode_excluir?: boolean | null
          pode_exportar?: boolean | null
          pode_visualizar?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          modulo_id?: string
          perfil_id?: string
          pode_aprovar?: boolean | null
          pode_criar?: boolean | null
          pode_editar?: boolean | null
          pode_excluir?: boolean | null
          pode_exportar?: boolean | null
          pode_visualizar?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "permissoes_modulo_id_fkey"
            columns: ["modulo_id"]
            isOneToOne: false
            referencedRelation: "sec_modulos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permissoes_perfil_id_fkey"
            columns: ["perfil_id"]
            isOneToOne: false
            referencedRelation: "sec_perfis"
            referencedColumns: ["id"]
          },
        ]
      }
      sec_profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          nome: string | null
          tipo: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          nome?: string | null
          tipo?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          nome?: string | null
          tipo?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sec_solicitacoes_lgpd: {
        Row: {
          atendido_por: string | null
          cliente_id: string
          dados_solicitados: string | null
          data_conclusao: string | null
          data_solicitacao: string | null
          id: string
          observacoes: string | null
          status: string
          tipo_solicitacao: string
        }
        Insert: {
          atendido_por?: string | null
          cliente_id: string
          dados_solicitados?: string | null
          data_conclusao?: string | null
          data_solicitacao?: string | null
          id?: string
          observacoes?: string | null
          status?: string
          tipo_solicitacao: string
        }
        Update: {
          atendido_por?: string | null
          cliente_id?: string
          dados_solicitados?: string | null
          data_conclusao?: string | null
          data_solicitacao?: string | null
          id?: string
          observacoes?: string | null
          status?: string
          tipo_solicitacao?: string
        }
        Relationships: [
          {
            foreignKeyName: "solicitacoes_lgpd_atendido_por_fkey"
            columns: ["atendido_por"]
            isOneToOne: false
            referencedRelation: "sec_usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solicitacoes_lgpd_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "ecom_clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      sec_tokens: {
        Row: {
          access_token: string
          created_at: string
          expires_at: string | null
          id: string
          provider: string
          refresh_token: string
          updated_at: string
        }
        Insert: {
          access_token: string
          created_at?: string
          expires_at?: string | null
          id?: string
          provider: string
          refresh_token: string
          updated_at?: string
        }
        Update: {
          access_token?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          provider?: string
          refresh_token?: string
          updated_at?: string
        }
        Relationships: []
      }
      sec_usuarios: {
        Row: {
          ativo: boolean | null
          auth_user_id: string | null
          bloqueado_ate: string | null
          created_at: string | null
          email: string
          id: string
          nome: string
          perfil_id: string | null
          requer_2fa: boolean | null
          senha_hash: string | null
          tentativas_login: number | null
          ultimo_acesso: string | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          auth_user_id?: string | null
          bloqueado_ate?: string | null
          created_at?: string | null
          email: string
          id?: string
          nome: string
          perfil_id?: string | null
          requer_2fa?: boolean | null
          senha_hash?: string | null
          tentativas_login?: number | null
          ultimo_acesso?: string | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          auth_user_id?: string | null
          bloqueado_ate?: string | null
          created_at?: string | null
          email?: string
          id?: string
          nome?: string
          perfil_id?: string | null
          requer_2fa?: boolean | null
          senha_hash?: string | null
          tentativas_login?: number | null
          ultimo_acesso?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_perfil_id_fkey"
            columns: ["perfil_id"]
            isOneToOne: false
            referencedRelation: "sec_perfis"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      gerar_numero_os: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      match_documents: {
        Args: { filter: Json; match_count: number; query_embedding: string }
        Returns: {
          id: string
          content: string
          similarity: number
        }[]
      }
      set_current_user_id: {
        Args: { user_id: string }
        Returns: undefined
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
