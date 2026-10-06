echo Using callbacks $CALLBACKS

ANSIBLE_USER=fedora

function train_create_ansible_inventory {
  local counter=${1}
  local inventory=${2}

  ansible_host=$(terraform output -json instance_public_ips | jq ".[0][${counter}]" | tr -d '"')
  ansible_user=$ANSIBLE_USER
  ansible_ssh_private_key_file=./${resource_prefix}/${counter}/access

  echo """host_${counter} ansible_host="$ansible_host" ansible_user=$ansible_user \
    ansible_ssh_private_key_file=$ansible_ssh_private_key_file  \
    ansible_ssh_common_args='-o StrictHostKeyChecking=no'""" >> $inventory

}

function train_create_readme {
  local counter=${1}
  local readme=${2}

  ansible_host=$(terraform output -json instance_public_ips | jq ".[0][${counter}]" | tr -d '"')
  webtop_url="https://${ansible_host}/?login=true"

  echo """user_${counter}: $webtop_url""" >> $readme

}

function train_apply_postprocess {

  counter=${instance_replica}
  inventory=$WORKDIR/${resource_prefix}/inventory
  :>$inventory
  readme=$WORKDIR/${resource_prefix}/readme.txt
  :>$readme
  while [[ ${counter} -ge 0 ]]; do
    train_create_ansible_inventory ${counter} $inventory
    train_create_readme ${counter} $readme
    counter=$((counter - 1))
  done

  cat <<EOF >> $inventory

[all:vars]
linux_user=${ANSIBLE_USER}
EOF
}
